import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`, { replace: true });
    } else {
      navigate("/products", { replace: true });
    }
  };
  return (
    <Fragment>
      <MetaData title={`Search a Product -- ECOMMERCE`} />
      <form
        className="w-[100vw] h-[100vh] max-w-full flex justify-center items-center bg-[rgb(231,231,231)] fixed top-0 left-0"
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
          className="shadow-md bg-white text-[rgba(0,0,0,0.637)] py-[1vmax] px-[2vmax] w-1/2 outline-none font-light text-[1.1vmax] font-[cursive] box-border h-[8%]"
        />
        <input
          type="submit"
          value="search"
          className="h-[8%] bg-red-500 p-[1vmax] w-[10%] font-light text-[1.1vmax] font-['Roboto'] cursor-pointer text-white transition-all hover:bg-[rgb(55,97,214)]"
        />
      </form>
    </Fragment>
  );
};

export default Search;
