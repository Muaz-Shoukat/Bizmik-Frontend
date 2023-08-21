import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import { clearErrors, resetPassword } from "../../store/actions/userAction";
import Loader from "../UI/Loader";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(myForm, token));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors);
    }
    if (success) {
      alert("Password Updated Successfully");

      navigate("/login", { replace: true });
    }
  }, [dispatch, error, success, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="flex flex-col sm:flex-row h-[100vh] w-[100vw] fixed top-0 left-0 max-w-full bg-[rgb(220,220,220)] items-center justify-center">
            <div className="flex h-[70vh] w-auto max-w-full flex-col justify-center items-center  bg-white">
              <h2 className="mb-0 text-center text-[rgba(0,0,0,0.664)] font-normal text-[1.4vmax] font-['Roboto'] p-[1.3vmax] border-b border-solid border-[rgba(0,0,0,0.205)] w-1/2 m-auto">
                Reset Password
              </h2>
              <form
                className="flex flex-col items-center m-auto p-[5vmax] sm:p-[2vmax] pt-0 justify-evenly h-4/5 transition-all duration-500"
                onSubmit={resetPasswordSubmit}
              >
                <div className="flex items-center w-full">
                  <LockOpenIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full">
                  <LockIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="bg-red-500 text-white font-light font-['Roboto'] text-[1.9vmax] sm:text-sm w-full sm:p-[0.8vmax] p-[1.8vmax] cursor-pointer transition-all rounded outline-none shadow-md hover:bg-[rgb(179,66,46)]"
                  //   disabled={loading ? false : true}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
