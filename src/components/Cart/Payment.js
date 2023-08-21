import { Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef } from "react";
import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../store/actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/process/payment`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!elements || !stripe) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/order/success");
        } else {
          alert("There's some issue while processing payment.");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      payBtn.current.disabled = false;
    }
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const form_divs = "flex items-center my-[10vw] sm:my-[2vmax] mx-0";
  const form_divs_input =
    "w-full py-[4vw] sm:py-[1vmax] px-[10vw] sm:px-[4vmax] pr-[1vmax] box-border border border-solid border-[rgba(0,0,0,0.267)] rounded outline-none";
  const form_divs_svg =
    "absolute translate-x-[1vmax] text-[6vw] sm:text-[1.6vmax] text-[rgba(0,0,0,0.623)]";

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="grid place-items-center bg-[rgb(255,255,255)] h-[65vh] m-[2vmax]">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="sm:w-[22%] w-[90%] h-full"
        >
          <Typography className="font-normal text-[8vw] sm:text-[2vmax] font-['Roboto'] text-[rgba(0,0,0,0.753)] border-b border-solid border-[rgba(0,0,0,0.13)] px-0 py-[4vw] sm:px-[1vmax] text-center sm:m-auto w-[60%] sm:w-1/2">
            Card Info
          </Typography>
          <div className={`${form_divs}`}>
            <CreditCardIcon className={`${form_divs_svg}`} />
            <CardNumberElement className={`${form_divs_input}`} />
          </div>
          <div className={`${form_divs}`}>
            <EventIcon className={`${form_divs_svg}`} />
            <CardExpiryElement className={`${form_divs_input}`} />
          </div>
          <div className={`${form_divs}`}>
            <VpnKeyIcon className={`${form_divs_svg}`} />
            <CardCvcElement className={`${form_divs_input}`} />
          </div>
          <input
            type="submit"
            value={`Pay - Rs${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="bg-red-500 text-white font-light text-[4vw] sm:text-[0.9vmax] font-['Roboto'] w-full p-[4vw] sm:p-[0.8vmax] cursor-pointer transition-all delay-500 outline-none hover:bg-[rgb(179,66,46)]"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
