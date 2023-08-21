import React from "react";

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-white grid place-items-center max-w-full">
      <div className="w-[10vmax] h-[10vmax] border-b-[5px] border-solid border-[rgba(110,110,110,0.719)] rounded-[50%] animate-spin"></div>
    </div>
  );
};

export default Loader;
