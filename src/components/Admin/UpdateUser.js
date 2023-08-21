import React, { Fragment, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Sidebar from "./Sidebar";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../store/constants/userConstants";
import {
  getUserDetails,
  clearErrors,
  updateUser,
} from "../../store/actions/userAction";
import { load } from "webfontloader";
import Loader from "../UI/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user, error, loading } = useSelector((state) => state.userDetails);
  const {
    isUpdated,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("User updated Successfully!!");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, updateError, user, userId, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  const form_Div_Classes = "flex w-full items-center";
  const form_Div_Input_Classes =
    "w-full box-border rounded sm:py-[1vmax] py-[2.5vmax] sm:px-[4vmax] px-[5vmax] pr-[1vmax] border border-solid border-[rgba(0,0,0,0.267)] font-light sm:text-[0.9vmax] text-[1.7vmax] font-[cursive] outline-none";
  const form_Div_Svg_Classes =
    "absolute  translate-x-[1vmax] text-[2.8vmax] sm:text-[1.6vmax] text-[rgba(0,0,0,0.623)] ";
  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border sm:bg-[rgb(221,221,221)] bg-[rgb(255,255,255)] border-l border-solid border-[rgba(0,0,0,0.158)] flex flex-col h-[100vh]">
          {loading ? (
            <Loader />
          ) : (
            <form
              onSubmit={updateUserSubmitHandler}
              className="flex flex-col items-center m-auto bg-white p-[5vmax] sm:p-[3vmax] justify-evenly h-[80%] w-[50vh] shadow-lg"
            >
              <h1>Update User</h1>
              <div className={`${form_Div_Classes}`}>
                <PersonIcon className={`${form_Div_Svg_Classes}`} />
                <input
                  className={`${form_Div_Input_Classes}`}
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={`${form_Div_Classes}`}>
                <MailOutlineIcon className={`${form_Div_Svg_Classes}`} />
                <input
                  className={`${form_Div_Input_Classes}`}
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={`${form_Div_Classes}`}>
                <VerifiedUserIcon className={`${form_Div_Svg_Classes}`} />
                <select
                  className={`${form_Div_Input_Classes}`}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                className="text-white w-full cursor-pointer rounded border-none bg-[#FF6347] font-light text-[0.9vmax] font-['Roboto'] p-[0.8vmax] transition-all delay-500 outline-none shadow-md hover:bg-red-700 disabled:bg-red-700"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
