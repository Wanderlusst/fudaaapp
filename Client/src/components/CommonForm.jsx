// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect,useRef } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "./ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { loginSwitch } from "../Redux/Cart";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {hashPassword} from '../components/Common/Bcrypt'
import ParticleComponent from '../components/Common/ParticleComponent'




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const CommonForm = (props) => {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.cart);
  const classes = useStyles();
  console.error = () => {};
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [updated, setUpdated] = useState(false);
  const yourElementRef = useRef(null);


const handleChange = (e) => {
  const { name, value } = e.target;
  e.preventDefault();
  if (isLogin) {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  } else {
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

  const handleLoginSubmit = (e) => {
    handleClose();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.email.length > 0) {
      const encryptedPassword = await hashPassword(signUpData.password, 10);
      setSignUpData((prev) => ({
        ...prev,
        password: encryptedPassword,
      }));
  
      setUpdated(true);
    }
  };

  useEffect(() => {
    if (updated && signUpData.email.length) {
      axios.post('http://localhost:8000/signup', signUpData)
        .then((res) => {
          res.statusText === "OK" ? dispatch(loginSwitch(true)) : handleClose();
        })
        .catch((err) => console.error(err, 'err'));
    }
  }, [updated]);
  


  const { themeMode } = useTheme();

  const divStyle = {
    backgroundColor: themeMode === "light" ? "#8BC6EC" : "#98a9ad",
    position: 'relative',
    backgroundImage:
      themeMode === "light"
        ? "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
        : "linear-gradient(135deg, #98a9ad 0%, #575871 100%)",
  };





  return (
    <>
      <div className={classes.root} style={{ ...divStyle }}>
        <div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl px-2"
            ref={yourElementRef}
          >
            <span className="font-bold text-white">
              FoodTopia
              <img
                style={{ height: "10rem" }}
                src="/src/Images/food-shopping-logo-template-design_460848-10299-removebg-preview.png"
              />
            </span>
          </h1>
        </div>
        {isLogin ? (
          <>
            <TextField
              label="Email"
              variant="filled"
              type="email"
              name="email"
              required
              value={loginData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              name="password"
              required
              value={loginData.password}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <TextField
              label="First Name"
              variant="filled"
              name="firstName"
              required
              value={signUpData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              variant="filled"
              required
              name="lastName"
              value={signUpData.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="filled"
              type="email"
              name="email"
              required
              value={signUpData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              name="password"
              required
              value={signUpData.password}
              onChange={handleChange}
            />
          </>
        )}

        <div>
          <Button variant="contained" onClick={handleClose}>
            {"Cancel"}
          </Button>
          <Button
            onClick={isLogin ? handleLoginSubmit : handleSignupSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isLogin ? "Login" : "signup"}
          </Button>
        </div>
        <div className="mr-4 text-white cursor-pointer">
          {isLogin ? "New user Signup here" : "Already have an account"}?{" "}
          {isLogin ? (
            <span
              className="text-red-700 font-bold hover:border-b-2 "
              onClick={() => dispatch(loginSwitch(false))}
            >
              Signup
            </span>
          ) : (
            <span
              className="text-red-700 font-bold hover:border-b-2"
              onClick={() => dispatch(loginSwitch(true))}
            >
              Login
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonForm;
