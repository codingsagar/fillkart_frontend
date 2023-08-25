import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Rate } from "antd";

const ProductItem = ({
  imageUrl,
  title,
  price,
  isGrocery,
  id,
  category,
  reviews,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const addItemToCart = (productId) => {
    if (!user) navigate("/cart");
    else dispatch(addToCart(productId));
  };

  function giveAverageRatings(reviews) {
    let totalRating = 0;

    const reviewsArrayLength = reviews?.length;

    for (let i = 0; i < reviewsArrayLength; i++) {
      const rating = reviews[i]?.rating;
      totalRating += rating;
    }
    return totalRating / reviewsArrayLength;
  }

  const rating = giveAverageRatings(reviews);

  return (
    <div className="rounded-md w-44 md:w-52 border md:hover:shadow-xl transition-all">
      <div className="image">
        <Link to={`/product/${category}/${id}`}>
          <img
            loading="lazy"
            src={imageUrl}
            alt=""
            className={`${isGrocery ? "scale-75" : null}
          w-full h-44 rounded-t-md object-cover`}
          />
        </Link>
      </div>
      <div className="product-info w-full px-2 py-3 flex flex-col gap-y-1">
        <p className="truncate font-medium">{title}</p>
        {rating > 0?
        <Rate defaultValue={rating} disabled allowHalf style={{fontSize:"16px"}}/>:
        <p className="text-xs font-medium text-red-400">No reviews</p>
        
        }
        <p className="font-extrabold text-[#0075FF]">₹{price}</p>
        {cart.find((product) => product.productId._id === id) ? (
          <button
            className=" md:hover:bg-red-600 md:hover:text-white text-red-500 border border-red-500 w-full rounded-sm py-1 font-medium flex items-center gap-x-2 justify-center"
            onClick={() => {
              dispatch(removeFromCart(id));
            }}
          >
            Remove <MdRemoveShoppingCart size={18} />
          </button>
        ) : (
          <button
            className="text-gray-700 md:hover:text-white md:hover:bg-gray-700 border-gray-700 border w-full rounded-sm py-1 font-medium flex items-center gap-x-2 justify-center"
            onClick={() => {
              addItemToCart(id);
            }}
          >
            Add to cart <FaCartPlus size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
