import { Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Sidebar from "./Sidebar";
import { clearErrors } from "../../store/actions/productAction";
import { getOrderDetails, updateOrder } from "../../store/actions/orderAction";
import Loader from "../UI/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../store/constants/orderConstant";

const ProcessOrder = () => {
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  
  const params = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, params, error, isUpdated, updateError]);
  const form_Div_Classes = "flex w-full items-center";
  const form_Div_Input_Classes =
    "w-full box-border rounded my-8 mx-0 sm:py-[1vmax] py-[2.5vmax] sm:px-[4vmax] px-[5vmax] border border-solid border-[rgba(0,0,0,0.267)] font-light sm:text-[0.9vmax] text-[1.7vmax] font-[cursive] outline-none";
  const form_Div_Svg_Classes =
    "absolute  translate-x-[1vmax] text-[2.8vmax] sm:text-[1.6vmax] text-[rgba(0,0,0,0.623)] ";
  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border sm:bg-[rgb(221,221,221)] bg-[rgb(255,255,255)] border-l border-solid border-[rgba(0,0,0,0.158)] flex flex-col h-[100vh]">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="h-auto sm:h-[100vh] bg-white grid grid-cols-[1fr] sm:grid-cols-[6fr_3fr]"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="p-[5vmax] pb-0">
                  <Typography className="font-normal text-[6vw] sm:text-[1.8vmax] font=['Roboto']">
                    Shipping Info
                  </Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "!text-green-500"
                            : "!text-red-500"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-[5vmax] pt-[2vmax]  ">
                  <Typography className="font-normal text-[6vw] sm:text-[1.8vmax] font-['Roboto']">
                    Your Cart Items:
                  </Typography>
                  <div className="max-h-[50vw] sm:max-h-[20vmax] overflow-y-auto">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
              <div
                className={`border-t border-l-0 sm:border-l sm:border-t-0 border-solid border-[rgba(0,0,0,0.247)] ${
                  order.orderStatus === "Delivered" ? "hidden" : "block"
                }`}
              >
                <form
                  onSubmit={updateOrderSubmitHandler}
                  className="my-[5vmax] mx-0 bg-white p-[5vmax] sm:p-[3vmax]"
                >
                  <h1>Process Order</h1>

                  <div className={`${form_Div_Classes}`}>
                    <AccountTreeIcon className={`${form_Div_Svg_Classes}`} />
                    <select
                      className={`${form_Div_Input_Classes}`}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {order.orderStatus === "processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    className="text-white w-full cursor-pointer rounded border-none bg-[#FF6347] font-light text-[0.9vmax] font-['Roboto'] p-[0.8vmax] transition-all delay-500 outline-none shadow-md hover:bg-red-700 disabled:bg-red-700"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
