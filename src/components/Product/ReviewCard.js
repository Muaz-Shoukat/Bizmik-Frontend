import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex-none shadow-lg w-[30vmax] flex flex-col items-center m-[1vmax] p-[3vmax]">
      <img className="w-[5vmax]" src={profilePng} alt="user" />
      <p className="text-[rgba(0,0,0,0.836)] font-semibold text-[1vw] font-['Roboto']">
        {review.name}
      </p>
      <Rating
        name="half-rating-read"
        defaultValue={0}
        value={review.rating}
        precision={0.5}
        readOnly
      />
      <span className="text-[rgba(0,0,0,0.445)] font-light text-[1.5vw] font-[cursive]">
        {review.comment}
      </span>
    </div>
  );
};

export default ReviewCard;
