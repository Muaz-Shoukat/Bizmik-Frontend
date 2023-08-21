import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal >= 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const proceedToPayment = () => {
    const data = {
      shippingCharges,
      tax,
      totalPrice,
      address,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="h-auto sm:h-[100vh] bg-white grid grid-cols-[1fr] sm:grid-cols-[6fr_3fr]">
        <div>
          <div className="p-[5vmax] pb-0">
            <Typography className="font-normal text-[6vw] sm:text-[1.8vmax] font=['Roboto']">
              Shipping Info
            </Typography>
            <div className="m-[2vmax]">
              <div className="flex my-[6vw] sm:my-[1vmax] mx-0">
                <p className="font-normal sm:text-[1vmax] text-[4vw] font-['Roboto']">
                  Name:
                </p>
                <span className="text-[#575757] font-thin text-[4vw] sm:text-[1vmax] font-['Roboto'] mx-[1vmax]">
                  {user.name}
                </span>
              </div>
              <div className="flex my-[6vw] sm:my-[1vmax] mx-0">
                <p className="font-normal sm:text-[1vmax] text-[4vw] font-['Roboto']">
                  Phone:
                </p>
                <span className="text-[#575757] font-thin text-[4vw] sm:text-[1vmax] font-['Roboto'] mx-[1vmax]">
                  {shippingInfo.phoneNo}
                </span>
              </div>
              <div className="flex my-[6vw] sm:my-[1vmax] mx-0">
                <p className="font-normal sm:text-[1vmax] text-[4vw] font-['Roboto']">
                  Address:
                </p>
                <span className="text-[#575757] font-thin text-[4vw] sm:text-[1vmax] font-['Roboto'] mx-[1vmax]">
                  {address}
                </span>
              </div>
            </div>
          </div>
          <div className="p-[5vmax] pt-[2vmax]  ">
            <Typography className="font-normal text-[6vw] sm:text-[1.8vmax] font-['Roboto']">
              Your Cart Items:
            </Typography>
            <div className="max-h-[50vw] sm:max-h-[20vmax] overflow-y-auto">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex font-normal text-[4vw] sm:text-[1vmax] font-['Roboto'] items-center justify-between my-[4vw] sm:my-[2vmax]"
                  >
                    <img
                      className="w-[10vw] sm:w-[3vmax]"
                      src={item.image}
                      alt="Product"
                    />
                    <Link
                      className="text-[#575757] m-0 sm:mx-[2vmax] w-[30%] sm:w-3/5 no-underline"
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                    <span className="font-thin font-['Roboto'] sm:text-[1vmax] text-[4vw] text-[#5e5e5e]">
                      {item.quantity} X Rs{item.price} ={" "}
                      <b>Rs{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="border-t border-l-0 sm:border-l sm:border-t-0 border-solid border-[rgba(0,0,0,0.247)]">
          <div className="p-[12vw] sm:p-[7vmax]">
            <Typography className="text-center font-normal text-[6vw] sm:text-[1.8vmax]  font-['Roboto'] border-b border-solid border-[rgba(0,0,0,0.267)] p-[4vw] sm:p-[1vmax] w-full m-auto box-border">
              Order Summary
            </Typography>
            <div>
              <div className="flex font-light sm:text-[1vmax] text-[4vw] font-['Roboto'] justify-between my-[2vmax]">
                <p>Subtotal:</p>
                <span className="text-[rgba(0,0,0,0.692)]">Rs{subtotal}</span>
              </div>
              <div className="flex font-light sm:text-[1vmax] text-[4vw] font-['Roboto'] justify-between my-[2vmax]">
                <p>Shipping Charges:</p>
                <span className="text-[rgba(0,0,0,0.692)]">
                  Rs{shippingCharges}
                </span>
              </div>
              <div className="flex font-light sm:text-[1vmax] text-[4vw] font-['Roboto'] justify-between my-[2vmax]">
                <p>GST:</p>
                <span className="text-[rgba(0,0,0,0.692)]">Rs{tax}</span>
              </div>
            </div>
            <div className="flex font-light font-['Roboto'] text-[4vw] sm:text-[1vmax] justify-between border-t border-solid border-[rgba(0,0,0,0.363)] py-[5vw] sm:py-[2vmax]">
              <p>
                <b className="font-semibold">Total:</b>
              </p>
              <span className="text-[rgba(0,0,0,0.692)]">Rs{totalPrice}</span>
            </div>
            <button
              className="bg-red-500 text-white w-full p-[4vw] sm:p-[1vmax] my-[4vw] mx-auto sm:m-auto cursor-pointer delay-300 font-normal text-[4vw] sm:text-[1vmax] font-['Roboto'] hover:bg-[rgb(192,71,50)] transition-all"
              onClick={proceedToPayment}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
