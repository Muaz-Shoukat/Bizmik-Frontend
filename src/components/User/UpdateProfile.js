import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import image from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../store/actions/userAction";
import Loader from "../UI/Loader";
import { UPDATE_PROFILE_RESET } from "../../store/constants/userConstants";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(image);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.uri);
      setEmail(user.email);
      setName(user.name);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors);
    }
    if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account", { replace: true });
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="flex flex-col sm:flex-row h-[100vh] w-[100vw] fixed top-0 left-0 max-w-full bg-[rgb(220,220,220)] items-center justify-center">
            <div className="flex h-[70vh] w-auto max-w-full flex-col justify-center items-center  bg-white">
              <h2 className="mb-0 text-center text-[rgba(0,0,0,0.664)] font-normal text-[2vmax] font-['Roboto'] p-[1.3vmax] border-b border-solid border-[rgba(0,0,0,0.205)] w-1/2 m-auto">
                Update Profile
              </h2>
              <form
                className="flex flex-col items-center m-auto p-[5vmax] sm:p-[2vmax] pt-0 justify-evenly h-4/5 transition-all duration-500"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="flex items-center w-full">
                  <FaceIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full">
                  <MailOutlineIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage" className="flex items-center">
                  <img
                    className="w-[8vmax] sm:w-[2vmax]  md:w-[4vmax] rounded-full mx-[1vmax] overflow-hidden"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                  <input
                    className="w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none file:w-full file:z-[2] file:h-[7vh] sm:file:h-[5vh] sm:file:font-normal file:font-medium file:m-0 file:py-0 file:px-[1vmax] file:text-sm file:text-[1.8vmax] file:font-[cursive] file:text-[rgba(0,0,0,0.623)] file:cursor-pointer file:bg-[rgb(255,255,255)] file:border-none hover:file:bg-[rgb(235,235,235)]"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
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

export default UpdateProfile;
