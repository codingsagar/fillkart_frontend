import React, { useState, useEffect,useCallback } from "react";
import { Pagination, Rate } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../features/product/productSlice";
import { MdDelete } from "react-icons/md";

export default function ProductReviews({
  allReviews,
  itemsPerPage,
  productId,
}) {
  const [reviews, setReviews] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  let allReviewsCopy = allReviews;

  const pageSize = 5;

  function handlePagination(pageNumber = 1) {
    const result = allReviewsCopy.slice(
      pageSize * (pageNumber - 1),
      pageSize * pageNumber
    );
    setReviews(result);
  }

  const handlePaginationCallback = useCallback(handlePagination,[allReviewsCopy]);

  useEffect(() => {
    handlePaginationCallback();
  },[handlePaginationCallback]);

  return allReviews.length > itemsPerPage ? (
    <>
      <div>
        {reviews?.map((review) => {
          return (
            <div className="my-8 flex gap-x-4" key={review?._id}>
              <div>
                <div className="h-10 w-10 bg-gray-500 rounded-full uppercase text-white flex justify-center items-center">
                  {review?.name[0]}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-5">
                  <p className="font-medium">{review?.name}</p>
                  {user?.email === review?.user?.email ? (
                    review.user ? (
                      <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={18}
                        onClick={() =>
                          dispatch(
                            deleteReview({ reviewId: review._id, productId })
                          )
                        }
                        title="Delete your review"
                      />
                    ) : null
                  ) : null}
                </div>
                <Rate
                  tooltips={desc}
                  defaultValue={review?.rating}
                  disabled
                  style={{ fontSize: "16px" }}
                />
                <div>
                  <p className="w-full text-sm md:text-base">
                    {review?.comment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={allReviews.length}
        onChange={handlePagination}
        pageSize={5}
      />
    </>
  ) : (
    <div>
      {allReviews.map((review) => {
        return (
          <div className="my-8 flex gap-x-4" key={review?._id}>
            <div>
              <div
                className="h-10 w-10 bg-gray-500 rounded-full uppercase text-white flex justify-center items-center cursor-default"
                title={review?.name}
              >
                {review?.name[0]}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-5">
                <p className="font-medium">{review?.name}</p>
                {user?.email === review?.user?.email ? (
                  review.user ? (
                    <MdDelete
                      className="text-red-500 cursor-pointer"
                      size={18}
                      onClick={() =>
                        dispatch(
                          deleteReview({ reviewId: review._id, productId })
                        )
                      }
                      title="Delete your review"
                    />
                  ) : null
                ) : null}
              </div>

              <Rate
                tooltips={desc}
                defaultValue={review?.rating}
                disabled
                allowHalf
                style={{ fontSize: "16px" }}
              />
              <div className="my-1">
                <p className="w-full text-sm md:text-base">{review?.comment}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
