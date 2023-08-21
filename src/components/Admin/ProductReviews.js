import React, { Fragment, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../store/actions/productAction";
import "./ProductList.css";
import { DELETE_REVIEW_RESET } from "../../store/constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value >= 3 ? "!text-green-500" : "!text-red-500";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate, productId]);

  const form_Div_Classes = "flex w-full items-center m-8";
  const form_Div_Input_Classes =
    "w-full box-border rounded sm:py-[1vmax] py-[2.5vmax] sm:px-[4vmax] px-[5vmax] pr-[1vmax] border border-solid border-[rgba(0,0,0,0.267)] font-light sm:text-[0.9vmax] text-[1.7vmax] font-[cursive] outline-none";
  const form_Div_Svg_Classes =
    "absolute  translate-x-[1vmax] text-[2.8vmax] sm:text-[1.6vmax] text-[rgba(0,0,0,0.623)] ";

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS -Admin`} />

      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border bg-[rgb(255,255,255)] border-l-0 border-t sm:border-l sm:border-t-0 border-solid sm:border-[rgba(0,0,0,0.158)] h-[100vh]">
          <form
            onSubmit={productReviewSubmitHandler}
            className="flex flex-col items-center m-auto bg-white p-[5vmax] sm:p-[3vmax] w-[20rem]"
          >
            <h1 className="text-[rgba(0,0,0,0.733)] font-light text-[2rem] font-['Roboto']">
              ALL REVIEWS
            </h1>
            <div className={`${form_Div_Classes}`}>
              <StarIcon className={`${form_Div_Svg_Classes}`} />
              <input
                className={`${form_Div_Input_Classes}`}
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              className="text-white w-full cursor-pointer rounded border-none bg-[#FF6347] font-light text-[0.9vmax] font-['Roboto'] p-[0.8vmax] transition-all delay-500 outline-none shadow-md hover:bg-red-700 disabled:bg-red-700"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              autoHeight
              className="bg-white productListTable "
            />
          ) : (
            <h1 className="text-[rgba(0,0,0,0.333)] font-light text-[1.4rem] font-['Roboto'] text-center">
              No Reviews Found
            </h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
