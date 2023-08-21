import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps.js";
import { saveShippingInfo } from "../../store/actions/cartAction";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert("Phone No should be 11 digits Long!");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, phoneNo, pinCode, country, state })
    );
    navigate("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="flex flex-col sm:flex-row h-auto w-[100vw] top-0 left-0 max-w-full items-center justify-center">
        <div className="flex h-[70vh] w-auto max-w-full flex-col justify-center items-center  bg-white">
          <h2 className="my-0 text-center text-[rgba(0,0,0,0.664)] font-normal text-[1.4vmax] font-['Roboto'] p-[1.3vmax] border-b border-solid border-[rgba(0,0,0,0.205)] w-1/2 m-auto">
            Shipping Details
          </h2>
          <form
            onSubmit={shippingSubmit}
            className="flex flex-col items-center mx-auto p-[5vmax] sm:p-[2vmax] justify-evenly h-[70%] transition-all duration-500"
            encType="multipart/form-data"
          >
            <div className="flex items-center w-full">
              <HomeIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
              <input
                className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full">
              <LocationCityIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
              <input
                className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full">
              <PinDropIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
              <input
                className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full">
              <PhoneIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
              <input
                className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="11"
              />
            </div>
            <div className="flex items-center w-full">
              <PublicIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
              <select
                className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className="flex items-center w-full">
                <TransferWithinAStationIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                <select
                  className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              className="bg-red-500 text-white font-light font-['Roboto'] text-[1.9vmax] sm:text-sm w-full sm:p-[0.8vmax] p-[1.8vmax] cursor-pointer transition-all rounded outline-none shadow-md hover:bg-[rgb(179,66,46)]"
              type="submit"
              value="Continue"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
