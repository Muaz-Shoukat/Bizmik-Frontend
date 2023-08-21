import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../UI/Loader";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  // const location = useLocation();

  // console.log(
  //   location,
  //   loading,
  //   isAuthenticated === false,
  //   isAdmin,
  //   user.role !== "admin",
  //   user
  // );

  return (
    <Fragment>
      {loading === false ? (
        isAuthenticated === false ? (
          <Navigate to="/login" replace />
        ) : isAdmin === true && user.role !== "admin" ? (
          <Navigate to="/login" replace />
        ) : (
          <Outlet />
        )
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
