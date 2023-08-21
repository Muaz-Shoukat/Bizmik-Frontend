import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="sm:relative z-50 sm:text-auto text-center w-full mx-auto top-0 sm:flex flex-row justify-between items-center sm:px-10 py-2 bg-[#635dc0] text-white">
      <span
        className="absolute top-3 left-5 sm:hidden"
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <RxCross1 style={{ width: "1.5rem", height: "1.5rem" }} />
        ) : (
          <RiMenu2Line style={{ width: "1.5rem", height: "1.5rem" }} />
        )}
      </span>
      <Link
        to="/home"
        className=" text-xl flex-auto text-center sm:text-left sm:text-3xl font-semibold italic font-['Roboto']"
      >
        <Link to="/">Ecommerce</Link>
      </Link>
      <div
        className={`bg-[rgb(212,212,212)] flex-auto sm:flex items-center justify-between sm:bg-inherit text-black absolute sm:static right-0 left-0 sm:text-white transition-all duration-500 ${
          visible ? "top-14" : "top-[-500px]"
        }`}
      >
        <div className="sm:flex pt-32 pb-4 sm:py-0 justify-between text-base items-center gap-10 font-semibold">
          <ul className="sm:flex justify-between gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
          <ul className="sm:flex justify-between gap-2">
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <ul className="sm:flex justify-between items-center gap-4">
          <li
            className={`absolute sm:static  text-white right-14 ${
              visible ? "top-[-45px]" : "-bottom-[296px]"
            } `}
          >
            <Link to="/search">
              <AiOutlineSearch style={{ width: "1.5rem", height: "1.5rem" }} />
            </Link>
          </li>
          <li
            className={`absolute sm:static  text-white right-5 ${
              visible ? "top-[-45px]" : "-bottom-[296px]"
            } `}
          >
            <Link to="/cart">
              <AiOutlineShopping
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
            </Link>
          </li>

          <li className="absolute sm:static w-[100px] sm:w-6 top-5 left-0 right-0 mx-auto">
            <Link to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-full sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  // <ReactNavbar {...options} />
};

export default Header;
