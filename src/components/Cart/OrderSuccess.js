import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  return (
    <div className="text-center m-auto p-[10vmax] h-[50vh] flex flex-col justify-center items-center">
      <CheckCircleIcon className=" text-[20vw] sm:text-[7vmax] text-red-500" />
      <Typography className=" text-[5vw] sm:text-[2vmax] sm:m-auto m-[2vmax]">
        Your product has been placed Successfully
      </Typography>
      <Link
        className="bg-[rgba(51,51,51)] text-white m-[2vmax] sm:py-[1vmax] py-[3vw] sm:px-[3vmax] px-[6vw] cursor-pointer font-normal text-[4vw] sm:text-[1vmax] font-['Roboto'] no-underline"
        to="/orders"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
