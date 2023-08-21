import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../store/actions/productAction";
import { addItemsToCart } from "../../store/actions/cartAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../UI/Loader";
import MetaData from "../Layout/MetaData";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../store/constants/productConstants";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const increaseQuantity = () => {
    if (quantity >= product.stock) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert("Item Added to Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert(reviewError.message);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Review submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="bg-white w-[100vw] max-w-full p-[6vmax] box-border flex flex-col sm:flex-row items-center">
            <div className="w-full flex flex-col justify-evenly items-center p-[2vmax] box-border border-[1px] border-solid border-white self-stretch">
              <Carousel className="w-[20vmax]">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.uri}
                      key={item.uri}
                      alt={`${i} Slide`}
                      className="CarouselImage"
                    />
                  ))}
              </Carousel>
            </div>
            <div className="w-full h-full flex flex-col justify-evenly items-center sm:items-start p-[2vmax] box-border border-[1px] border-solid border-white">
              <div>
                <h2 className="text-2xl sm:text-[1.6vmax] text-center sm:text-left font-['Roboto']  font-semibold text-[rgb(54,54,54)]">
                  {product.name}
                </h2>
                <p className="font-light text-xs sm:text-left text-center  font-[cursive] text-[rgba(54,54,54,0.582)]">
                  Product # {product._id}
                </p>
              </div>
              {/* subDiv 1 */}
              <div className="flex justify-center sm:justify-start items-center sm:w-[70%] w-[80%] py-[1vmax] border-y border-solid  border-[rgba(0,0,0,0.205)] my-1">
                <Rating
                  name="half-rating-read"
                  defaultValue={0}
                  value={product.ratings}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <span className="text-[rgba(0,0,0,0.699)] font-extralight text-sm sm:text-[0.8vmax] font-[cursive]">
                  ({product.numofReviews} Reviews)
                </span>
              </div>
              {/* subDiv 2 */}
              <div className="w-[70%]">
                <h1 className="text-[rgba(17,17,17,0.795)] text-center sm:text-left sm:text-2xl text-3xl sm:font-semibold font-bold font-['Franklin Gothic Medium'] my-[1vmax]">{`₨: ${product.price}`}</h1>
                <div className="flex flex-col items-center sm:flex-row">
                  <div className="sm:p-0 py-[2vmax]">
                    <button
                      className="bg-[rgba(0,0,0,0.616)] sm:w-[3vmax] rounded-l-md w-[4vmax] p-[1.2vmax] sm:p-[0.5vmax] cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      value={quantity}
                      readOnly
                      type="number"
                      className="border-none p-[1.5vmax] sm:p-[0.5vmax] w-[5vmax] sm:w-[2vmax] text-center outline-none text-[rgba(0,0,0,0.74)] text-base font-normal font-['Roboto']"
                    />
                    <button
                      className="bg-[rgba(0,0,0,0.616)] sm:w-[3vmax] rounded-r-md w-[4vmax] p-[1.2vmax] sm:p-[0.5vmax] cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  {/* subDiv 3.1.1 */}
                  <button
                    className="border-none cursor-pointer text-white transition-all bg-red-600 font-medium sm:font-semibold text-base sm:text-sm font-['Roboto'] rounded-[20px] p-[1.5vmax] sm:py-[0.5vmax] sm:px-[2vmax] my-[3vmax] sm:m-[1vmax] outline-none hover:bg-[rgb(214,84,61)] w-[20vmax] sm:w-[15vmax]"
                    onClick={addToCartHandler}
                    disabled={product.stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>
                {/* subDiv 3.1 */}
                <p className="border-y border-solid border-[rgba(0,0,0,0.205)] py-[2.5vmax] sm:py-[1vmax] text-[rgba(0,0,0,0.651] sm:text-left text-center text-base font-sans sm:font-['Roboto'] my-[1vmax]">
                  Status:{" "}
                  <b
                    className={
                      product.Stock < 1 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              {/* subDiv 3 */}

              <div className="text-[rgba(0,0,0,0.897)] font-sans text-xl font-medium">
                Description:{" "}
                <p className="text-[rgba(0,0,0,0.534)] text-base sm:text-sm font-light font-sans">
                  {product.description}
                </p>
              </div>
              {/* subDiv 4 */}
              <button
                className="bg-red-500 font-medium text-base font-['Roboto'] rounded-[20px] p-[1.5vmax] sm:py-[0.6vmax] sm:px-[2vmax] my-[3vmax] sm:my-[1vmax] w-[20vmax] sm:w-[15vmax] text-white cursor-pointer transition-all outline-none hover:bg-[rgb(197,68,45)] hover:scale-[1.1]"
                onClick={submitReviewToggle}
              >
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="text-[#000000be] font-medium text-sm font-['Roboto'] text-center border-b border-solid border-[rgba(0,0,0,0.266)] p-[1vmax] w-[20vmax] m-auto mb-[4vmax]">
            REVIEWS
          </h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="flex flex-col">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                size="large"
                precision={0.5}
              />
              <textarea
                className="border border-solid border-[rgba(0,0,0,0.082)] my-[1vmax] mx-0 outline-none p-[1rem] font-light text-[1rem] font-['Roboto']"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="flex overflow-auto">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className="font-normal text-base font-['Gill Sans'] text-center text-[rgba(0,0,0,0.548)]">
              No Reviews Yet
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
