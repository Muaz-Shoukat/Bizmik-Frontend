import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import { redirect } from "react-router-dom";
import ProductCard from "./ProductCard.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../store/actions/productAction.js";
import Loader from "../UI/Loader.js";
import MetaData from "../Layout/MetaData.js";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    // console.log(error);
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`ECOMMERCE`} />
          <div className="md:mx-auto max-w-full">
            <div className="pt-[30vh] bg-gradient-to-r from-[#635dc0] to-[#3027ae] h-[100vmin] text-center flex flex-col items-center justify-center text-white after:content-[''] after:w-full after:relative after:h-[100vmin] after:bg-[#fff] after:top-0 after:left-0 after:max-w-full after:cut-clip-path">
              <p className="font-['Lucida Sans'] text-[1.4vmax]">
                Welcome to Ecommerce
              </p>
              <h1 className="text-3xl font-semibold m-[5vmax] text-[2.5vmax] font-[Roboto]">
                FIND AMAZING PRODUCTS BELOW
              </h1>
              <a href="#container">
                <button
                  className="flex items-center mb-[5vmax] cursor-pointer bg-white border-[1px] border-solid border-white text-black p-[1vmax] transition-all w-[9vmax] justify-center font-[Roboto] text-[1vmax] font-medium hover:bg-transparent hover:text-white"
                  onClick={() => {
                    redirect("container");
                  }}
                >
                  Scroll <CgMouse />
                </button>
              </a>
            </div>
            <h2 className="text-center border-b-[1px] font-[Roboto] text-xl font-semibold text-[1.4vmax] border-solid border-[rgba(21,21,21,0.5)] w-[20vmax] p-[1vmax] my-[5vmax] mx-auto text-[rgba(0,0,0,0.7)] ">
              Featured Products
            </h2>
            <div
              className="flex m-[2vmax] mx-auto w-[80vw] flex-wrap justify-center"
              // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,_20%)] sm:gap-4 place-items-center md:justify-center"
              id="container"
            >
              {!error && products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
