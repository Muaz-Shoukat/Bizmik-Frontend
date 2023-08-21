import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const subDiv = "flex h-[100vh] w-[100vw] max-w-full flex-col justify-center";
  const lastDivChild_p =
    "text-[rgba(0,0,0,0.418)] font-normal text-[2vmax] sm:text-[1vmax] font-[cursive] my-[0.5vmax] mx-0 sm:m-[0.2vmax]";
  const lastDivChild_h4 =
    "text-black font-normal text-[2.5vmax] sm:text-[1.2vmax] font-['Roboto']";

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="flex flex-col sm:flex-row h-[100vh] w-[100vw] fixed top-0 left-0 max-w-full bg-white">
            <div className={`${subDiv}  items-center`}>
              <h1 className="text-[rgba(0,0,0,0.555)] font-medium sm:text-[2.2vmax] text-[3.2vmax] font-['Roboto'] sm:translate-x-[-10vmax] translate-y-[-2vmax]">
                My Profile
              </h1>
              <img
                className="w-[20vmax] h-[20vmax] object-contain rounded-full transition-all hover:scale-[1.05]"
                src={user.avatar.uri}
                alt={user.name}
              />
              <Link
                className="border-none bg-red-500 font-normal text-[1.7vmax] sm:text-[1vmax] font-['Roboto'] text-white no-underline p-[1vmax] sm:p-[0.5vmax] w-[30%] m-[4vmax] text-center transition-all hover:bg-[rgb(204,78,56)] "
                to="/me/update"
              >
                Edit Profile
              </Link>
            </div>
            <div
              className={`${subDiv} items-center sm:items-start justify-evenly p-[2vmax] box-border text-center sm:text-left`}
            >
              <div>
                <h4 className={lastDivChild_h4}>Full Name</h4>
                <p className={lastDivChild_p}>{user.name}</p>
              </div>
              <div>
                <h4 className={lastDivChild_h4}>Email</h4>
                <p className={lastDivChild_p}>{user.email}</p>
              </div>
              <div>
                <h4 className={lastDivChild_h4}>Joined on</h4>
                <p className={lastDivChild_p}>
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>
              <div className="flex flex-col w-3/5">
                <Link
                  className="bg-[rgb(68,68,68)] border-none font-normal text-[1.8vmax] sm:text-[1vmax] font-['Roboto'] text-white p-[1vmax] sm:p-[0.5vmax] text-center transition-all my-[2vmax] sm:my-[1vmax] mx-0 hover:bg-[rgb(31,31,31)]"
                  to="/orders"
                >
                  My Orders
                </Link>
                <Link
                  className="bg-[rgb(68,68,68)] border-none font-normal text-[1.8vmax] sm:text-[1vmax] font-['Roboto'] text-white p-[1vmax] sm:p-[0.5vmax] text-center transition-all my-[2vmax] sm:my-[1vmax] mx-0 hover:bg-[rgb(31,31,31)]"
                  to="/password/update"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
