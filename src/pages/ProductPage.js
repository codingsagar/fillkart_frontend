import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Categories from "../components/Categories";
import {
  getProductWithId,
  giveReview,
  productStateReset,
} from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import loadingData from "../images/data.json";
import Lottie from "lottie-react";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { cartStateReset } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Rate, Modal } from "antd";
import ProductReviews from "../components/ProductReviews";

const ProductPage = () => {
  const [reviewInput, setReviewInput] = useState("");
  const [charsLeft, setCharsLeft] = useState(200);
  const [rating, setRating] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const reviewRef = useRef();

  const dispatch = useDispatch();
  const {
    product,
    isLoading,
    message: msg,
  } = useSelector((state) => state.product);

  const handleTextArea = (event) => {
    setReviewInput(event.target.value);
    const reviewLengthLeft = 200 - reviewRef.current.value.length;
    setCharsLeft(reviewLengthLeft);
  };
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, message } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(
      giveReview({
        review: reviewInput,
        productId: product?._id,
        rating,
      })
    );
    setReviewInput("");
    setCharsLeft(200);
    setRating(0);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClearReviewForm = () => {
    setRating(0);
    setReviewInput("");
    setCharsLeft(200);
  };

  useEffect(() => {
    if (isSuccess && message) {
      message === "Product added to cart."
        ? toast.success(message, { theme: "colored", autoClose: 1000 })
        : toast.info(message, { theme: "colored", autoClose: 1000 });
    }
    dispatch(cartStateReset());
  }, [isSuccess, dispatch, message]);

  useEffect(() => {
    if (msg) {
      msg === "Review added successfully !"
        ? toast.success(msg, { theme: "colored", autoClose: 1000 })
        : toast.info(msg, { theme: "colored", autoClose: 1000 });
    }
    dispatch(productStateReset());
  }, [msg, dispatch]);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductWithId(id));
  }, [id, dispatch, msg]);

  const navigate = useNavigate();

  let totalRating = 0;

  const reviewsArrayLength = product?.reviews?.length;

  for (let i = 0; i < reviewsArrayLength; i++) {
    const rating = product?.reviews[i]?.rating;
    totalRating += rating;
  }

  const averageRating = totalRating / reviewsArrayLength;

  if (isLoading || product?._id !== id) {
    return (
      <>
        <Categories />
        <div className="min-h-screen flex items-center justify-center flex-col">
          <Lottie
            animationData={loadingData}
            loop={true}
            style={{ height: 120 }}
          />
          <span className="font-medium text-primary">Loading ....</span>
        </div>
      </>
    );
  }

  if (product) {
    return (
      <div key={product._id}>
        <Categories />
        <div className="grid md:place-content-center my-8">
          <button
            className="ml-6 flex items-center gap-x-1 text-primary w-max"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackOutline />
            Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[350px] mt-10">
            <div className="justify-self-center md:w-80 max-w-[250px]">
              <img
                src={product.imageUrl}
                alt=""
                className="hover:saturate-150 transition-transform"
              />
            </div>
            <div className="md:mr-20 my-10 md:my-0 mx-4 md:mx-8">
              <h2 className="text-lg font-medium">{product.name}</h2>
              <span className="text-sm font-medium text-red-500">
                <Rate
                  tooltips={desc}
                  defaultValue={averageRating}
                  disabled
                  allowHalf
                />
                &nbsp;&nbsp;
                {product?.reviews?.length === 0
                  ? " (No reviews) "
                  : "(" + averageRating.toFixed(1) + ")"}
              </span>
              {product?.reviews?.length > 0 ? (
                <span className="text-sm font-bold text-slate-600 mx-2">
                  {product?.reviews?.length} reviews
                </span>
              ) : null}

              <p className="text-xl font-semibold my-4 text-[#c53c3c] flex gap-x-3">
                ₹{product.price}
                <span className="text-sm border border-gray-800 py-1 px-3 text-gray-800 font-medium rounded">
                  Low stock remaining
                </span>
              </p>
              {cart.find((p) => p.productId._id === product._id) ? (
                <button
                  className="btn-cart-remove my-3"
                  onClick={() => dispatch(removeFromCart(product._id))}
                >
                  Remove item
                </button>
              ) : (
                <button
                  className="btn-primary my-3"
                  onClick={() =>
                    !user
                      ? navigate("/cart")
                      : dispatch(addToCart(product?._id))
                  }
                >
                  Add to cart
                </button>
              )}
              <p className="mt-3 text-[15px] font-medium text-gray-700 my-1">
                Description :
              </p>
              <p className="text-[14px] text-gray-500">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-2 md:mx-5 lg:mx-40 my-5" key={product._id}>
          <h1 className="font-semibold text-lg">
            Products reviews - ({product?.reviews?.length})
          </h1>

          {product?.reviews?.length === 0 ? (
            <p className="mt-2"> 🚀 No reviews yet, be the first one.</p>
          ) : null}
          {user ? (
            <button className="btn-primary mt-5" onClick={showModal}>
              Submit your review
            </button>
          ) : (
            <Link to="/login">
              <button className="btn-primary my-5">
                Login to submit review
              </button>
            </Link>
          )}

          <ProductReviews
            itemsPerPage={5}
            allReviews={product?.reviews}
            productId={product._id}
          />
        </div>
        <Modal
          title="Give a review 👍"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <div>
            <Rate
              tooltips={desc}
              value={rating}
              allowHalf
              onChange={setRating}
            />
            <span className="text-red-500 mx-2">Required</span>
          </div>
          <textarea
            name="review"
            id=""
            rows="6"
            placeholder="Write your review about the product"
            className="border-2 border-gray-700 w-full mt-5 rounded-md p-2 resize-none"
            maxLength={200}
            ref={reviewRef}
            value={reviewInput}
            onChange={(e) => handleTextArea(e)}
            spellCheck={false}
          ></textarea>
          <p className="text-sm font-medium text-red-500">
            {charsLeft} characters left (Minimum 10 chars)
          </p>
          <button
            className="btn-primary mt-5 disabled:bg-violet-300"
            onClick={handleOk}
            disabled={reviewInput.length < 10 || rating === 0}
            title={
              reviewInput.length < 10 || rating === 0
                ? "Both review and rating are required"
                : null
            }
          >
            Submit Review
          </button>
          <button
            className="btn-layout bg-transparent text-slate-800 border border-slate-800 mx-2"
            onClick={handleClearReviewForm}
          >
            Clear
          </button>
        </Modal>
      </div>
    );
  }
};

export default ProductPage;
