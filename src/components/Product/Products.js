import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../store/actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../UI/Loader";
import Pagination from "react-js-pagination";
import "./products.css";
import { Typography, Slider } from "@mui/material";
import MetaData from "../Layout/MetaData";

const categories = [
  "All",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  const dispatch = useDispatch();
  const params = useParams();
  const {
    loading,
    products,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  useEffect(() => {
    // console.log(error);
    if (error) {
      alert(error);
      dispatch(clearErrors);
    }

    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`PRODUCTS -- ECOMMERCE`} />
          <h1 className="my-[2vmax] mt-10 mx-auto w-[15vw] border-b border-solid border-[rgba(0,0,0,0.171)] p-[2vmax] text-[rgba(0,0,0,0.678)] font-medium font-['Roboto'] text-base text-center">
            Products
          </h1>
          <div className="flex flex-wrap py-0 px-[5vmax] justify-center min-h-[30vh">
            {products &&
              products[0] &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          {keyword && (
            <div className="sm:w-[10vmax] w-[20vmax] sm:absolute static top-[10vmax] left-[4vmax] m-auto">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="p-0">
                {categories.map((category) => (
                  <li
                    className="text-[rgba(0,0,0,0.61)] font-normal text-base sm:text-sm font-['Roboto'] m-[0.4vmax] cursor-pointer transition-all hover:text-red-500"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <fieldset className="border border-solid border-gray-300 p-2">
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => setRatings(newRating)}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </fieldset>
            </div>
          )}
          {resultPerPage < count && (
            <div className="flex justify-center m-[6vmax]">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="bg-[rgb(255,255,255)] border-[1px] border-solid border-[rgba(0,0,0,0.178)] py-[1vmax] px-[1.5vmax] transition-all cursor-pointer first:rounded-md last:rounded-md  hover:bg-[rgb(230,230,230)]"
                linkClass="font-light font-['Roboto'] text-sm text-[rgb(80,80,80)] transition-all hover:text-[rgb(80,80,80)]"
                activeClass="bg-red-500"
                activeLinkClass="text-white font-light font-['Roboto'] text-base sm:text-sm"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
