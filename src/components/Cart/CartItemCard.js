import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = (props) => {
  return (
    <div
      className={`flex p-[3vmax] sm:p-[1vmax] sm:h-[8vmax] h-[25vmax] items-start box-border`}
    >
      <img
        className="sm:w-[5vmax] w-[10vmax]"
        src={props.item.image}
        alt="ssa"
      />
      <div className="flex my-[1vmax] sm:my-[0.3vmax] mx-[2vmax] sm:mx-[1vmax] flex-col">
        <Link
          className="font-light text-[2vmax] sm:text-[0.9vmax] font-[cursive] text-[rgba(24,24,24,0.815)] no-underline "
          to={`/product/${props.item.product}`}
        >
          {props.item.name}
        </Link>
        <span className="font-light text-[1.9vmax] sm:text-[0.9vmax] font-['Roboto'] text-[rgba(24,24,24,0.815)]">{`Price: Rs${props.item.price}`}</span>
        <p
          className="text-red-500 font-thin text-[1.8vmax] sm:text-[0.8vmax] font-['Roboto'] cursor-pointer"
          onClick={() => props.deleteCartItems(props.item.product)}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
