import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="w-[14vmax] flex flex-col no-underline text-[rgb(48,48,48)] m-[2vmax] transition-all pb-[0.5vmax] hover:shadow-md hover:translate-y-[-1vmax]"
      to={`/product/${product._id}`}
    >
      <img
        className="w-[14vmax]"
        src={product.images[0].uri}
        alt={product.name}
      />
      <p className="text-[1.7vmax] font-[Roboto] sm:text-[1.2vmax] my-[1vmax] mx-[0.5vmax] mb-0">
        {product.name}
      </p>
      <div className="sm:m-[0.5vmax] sm:flex justify-start items-center m-[0mvax]  block">
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={product.ratings}
          precision={0.5}
          readOnly
        />
        <span className="m-[0.5vmax] font-light text-[0.7vmax] font-['Roboto'] sm:m-[0.5vmax] sm:font-light sm:text-[0.7vmax] sm:font-[Roboto]">
          ({product.numofReviews} Reviews)
        </span>
      </div>
      <span className="text-[1.5vmax] m-[0.5vmax] text-[#FF6347] font-['Franklin Gothic Medium','Arial Narrow',Arial,sans-serif] sm:text-[1vmax]">
        {`₨: ${product.price}`}
      </span>
    </Link>
  );
};

export default ProductCard;
