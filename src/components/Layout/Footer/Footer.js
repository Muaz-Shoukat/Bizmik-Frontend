import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

export default function Footer() {
  return (
    <footer className="mt-[10vmax] p-[2vmax] bg-black text-white sm:flex items-center">
      <div className="w-full text-center sm:w-2/5 sm:flex flex-col items-center">
        <h4 className="sm:text-base text-sm font-['Franklin Gothic Medium','Arial Narrow',Arial,'sans-serif']">
          DOWNLOAD OUR APP
        </h4>
        <p className="text-center my-2 sm:my-0 sm:text-base text-sm font-['Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif]">
          Download App for Android and IOS mobile phone
        </p>
        <div className="flex items-center justify-center">
          <img
            className="w-[10vmax] m-[1vmax] cursor-pointer"
            src={playStore}
            alt="playstore"
          />
          <img
            className="w-[10vmax] m-[1vmax] cursor-pointer"
            src={appStore}
            alt="appstore"
          />
        </div>
      </div>
      <div className="w-full my-4 sm:my-0 sm:w-3/5 text-center">
        <h1 className="text-xl sm:text-[4vmax] font-[Roboto] text-[#eb4034]">
          ECOMMERCE
        </h1>
        <p className="max-w-3/5 my-[1vmax] text-sm sm:text-base  mx-auto">
          High Quality is our first priority
        </p>
        <p className="text-xs text-[rgb(222,222,222)] sm:text-white sm:text-base">
          Copyrights 2021 &copy; MeMuaz
        </p>
      </div>
      <div className="w-full text-center sm:w-1/5 flex flex-col items-center sm:m-0 my-4">
        <h4 className="font-[Roboto] text-sm sm:text-base font-normal sm:text-[1.4vmax] sm:font-semibold underline">
          Follow Us
        </h4>
        <div className="flex items-center justify-around">
          <a
            className="no-underline text-[1.3vmax] font-['Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif] text-white m-[0.5vmax] transition-all hover:text-[#eb4034]"
            href="http://instagram.com/meabhisingh"
          >
            Instagram
          </a>
          <a
            className="no-underline text-[1.3vmax] font-['Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif] text-white m-[0.5vmax] transition-all hover:text-[#eb4034]"
            href="http://instagram.com/meabhisingh"
          >
            YouTube
          </a>
          <a
            className="no-underline text-[1.3vmax] font-['Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif] text-white m-[0.5vmax] transition-all hover:text-[#eb4034]"
            href="http://instagram.com/meabhisingh"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
