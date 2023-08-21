import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import image from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../store/actions/userAction";
import Loader from "../UI/Loader";

const LoginSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState(image);
  const [avatarPreview, setAvatarPreview] = useState(image);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, name, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors);
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`, { replace: true });
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("translate-x-0");
      switcherTab.current.classList.remove("translate-x-[100%]");

      registerTab.current.classList.remove(
        "translate-x-0",
        "translate-y-[-100%]"
      );
      registerTab.current.classList.add(
        "translate-x-[-100vmax]",
        "translate-y-[-100%]"
      );
      loginTab.current.classList.remove("translate-x-[-100%]");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("translate-x-[100%]");
      switcherTab.current.classList.remove("translate-x-0");
      registerTab.current.classList.remove("translate-x-[-100vmax]");
      registerTab.current.classList.add("translate-x-0", "translate-y-[-100%]");
      loginTab.current.classList.add("translate-x-[-100%]");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="w-[100vw] h-[90vh] top-20 sm:h-[100vh] max-w-full flex justify-center items-center sm:bg-[rgb(231,231,231)] bg-white fixed sm:top-0 left-0">
            <div className="bg-white w-[100vw] sm:w-[25vw] h-[95vh] sm:h-[70vh] box-border overflow-hidden">
              <div>
                <div className="flex h-[5vmax] sm:h-[3vmax]">
                  <p
                    className="text-[rgba(0,0,0,0.678)] font-light text-[1.5vmax] sm:text-sm font-['Roboto'] transition-all cursor-pointer grid place-items-center w-full hover:text-red-500"
                    onClick={(e) => switchTabs(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className="text-[rgba(0,0,0,0.678)] font-light text-[1.5vmax] sm:text-sm font-['Roboto'] transition-all cursor-pointer grid place-items-center w-full hover:text-red-500"
                    onClick={(e) => switchTabs(e, "register")}
                  >
                    REGISTER
                  </p>
                </div>
                <button
                  className="bg-red-500 h-[3px] w-1/2 transition-all"
                  ref={switcherTab}
                ></button>
              </div>
              <form
                ref={loginTab}
                onSubmit={loginSubmit}
                className="flex flex-col items-center m-auto p-[5vmax] sm:p-[2vmax] justify-evenly h-[70%] transition-all duration-500"
              >
                <div className="flex items-center w-full">
                  <MailOutlineIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full">
                  <LockOpenIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link
                  className="text-[rgba(0,0,0,0.651)] self-end transition-all font-medium text-[1.8vmax] sm:text-sm font-['Gill Sans'] hover:text-black"
                  to="/password/forgot"
                >
                  Forget Password ?
                </Link>
                <input
                  className="bg-red-500 text-white font-light font-['Roboto'] text-[1.9vmax] sm:text-sm w-full sm:p-[0.8vmax] p-[1.8vmax] cursor-pointer transition-all rounded outline-none shadow-md hover:bg-[rgb(179,66,46)]"
                  type="submit"
                  value="Login"
                />
              </form>
              <form
                className="translate-y-[-100%] translate-x-[-100vmax] flex flex-col items-center m-auto p-[5vmax] sm:p-[2vmax] justify-evenly h-[70%] transition-all duration-500"
                encType="multipart/form-data"
                ref={registerTab}
                onSubmit={registerSubmit}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>
                <div className="flex items-center w-full">
                  <LockOpenIcon className="text-[2.8vmax] absolute translate-x-[1vmax] sm:text-base text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="py-[2.5vmax] px-[5vmax] sm:py-[1vmax] sm:px-[4vmax] sm:pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage" className="flex items-center">
                  <img
                    className="w-[8vmax] sm:w-[2vmax]  md:w-[3vmax] rounded-full"
                    src={avatarPreview}
                    alt="Avatar Preview"
                  />
                  <input
                    className="w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none file:w-full file:z-[2] file:h-[7vh] sm:file:h-[5vh] sm:file:font-normal file:font-medium file:m-0 file:py-0 file:px-[1vmax] file:text-sm file:text-[1.8vmax] file:font-[cursive] file:text-[rgba(0,0,0,0.623)] file:cursor-pointer file:bg-[rgb(255,255,255)] file:border-none hover:file:bg-[rgb(235,235,235)]"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
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

export default LoginSignUp;
