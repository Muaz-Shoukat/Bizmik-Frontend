import React, { Fragment } from "react";
import Home from "../components/Home/Home";
import MetaData from "../components/Layout/MetaData";
const HomePage = () => {
  return (
    <Fragment>
      <MetaData title="Ecommerce" />
      <Home />
    </Fragment>
  );
};

export default HomePage;
