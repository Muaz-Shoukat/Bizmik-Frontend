import React, { Fragment} from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../store/actions/cartAction";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import MetaData from "../Layout/MetaData";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantityHandler = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (quantity >= stock) return;
    console.log(newQty);
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantityHandler = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="m-auto text-center p-[10vmax] h-[50vh] flex flex-col justify-center items-center">
          <RemoveShoppingCartIcon className="font-[5vmax] text-red-500" />
          <Typography className="text-[2vmax]">
            No Product in your Cart
          </Typography>
          <Link
            className="bg-[rgb(51,51,51)] text-white border-none py-[1vmax] px-[3vmax] cursor-pointer font-normal text-[1vmax] font-['Roboto'] no-underline"
            to="/products"
          >
            View Products
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="sm:p-[5vmax] p-0 min-h-[60vh] sm:h-auto">
            <div className="bg-red-500 sm:w-[90%] w-full box-border m-auto text-white grid grid-cols-5 sm:grid-cols-6 font-light sm:text-[0.7vmax] text-[1vmax] font-['Roboto']">
              <p className="m-[10px] col-span-3 sm:col-span-4">Product</p>
              <p className="m-[10px] col-span-1">Quantity</p>
              <p className="m-[10px] col-span-1 text-end">Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product}
                  className="w-full sm:w-[90%] m-auto grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[4fr_1fr_1fr]"
                >
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="flex items-center sm:h-[8vmax] h-[20vmax] ">
                    <button
                      className="bg-[rgba(0,0,0,0.616)] cursor-pointer text-white transition-all p-[1.5vmax] sm:p-[0.5vmax] hover:bg-[rgba(0,0,0,0.767)]"
                      onClick={() =>
                        decreaseQuantityHandler(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input
                      className="p-[1vmax] sm:p-[0.5vmax] border-none w-[2.5vmax] outline-none text-center font-normal text-[1.5vmax] sm:text-[0.8vmax] font-['Roboto'] text-[rgba(0,0,0,0.74)]"
                      type="number"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="bg-[rgba(0,0,0,0.616)] cursor-pointer text-white transition-all p-[1.5vmax] sm:p-[0.5vmax] hover:bg-[rgba(0,0,0,0.767)]"
                      onClick={() =>
                        increaseQuantityHandler(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="flex sm:h-[8vmax] h-[20vmax] p-[1.5vmax] sm:p-[0.5vmax] justify-end text-[rgba(0,0,0,0.753)] items-center box-border font-light sm:text-[1vmax] text-[2vmax] font-['Roboto'] sm:font-[cursive]">{`Rs ${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="grid sm:grid-cols-[2fr_1.2fr] grid-cols-[0fr_2fr]">
              <div className=""> </div>
              <div className="border-t-[3px] border-solid border-red-500 my-[1vmax] mx-[4vmax] box-border p-[2vmax] sm:py-[2vmax] sm:px-0 font-light text-[2vmax] sm:text-[1vmax] font-['Roboto'] flex justify-between">
                <p>Gross Total:</p>
                <p>{`(Rs)${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 py-[2vmax] sm:py-[0.8vmax] px-[4vmax] rounded-[30px] text-white cursor-pointer my-[1vmax] mx-[4vmax] w-full sm:w-1/2 font-light sm:text-[1vmax] text-[2vmax] font-['Roboto']"
                  onClick={checkoutHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
