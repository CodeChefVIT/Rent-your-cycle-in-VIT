import React, { useState } from "react";
import logo from "../../logo.svg";
import "./Home.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AuthSelector,
  userSelector,
  set_user,
  remove_user,
} from "../../reducers/userSlice";

function Home() {
  const { isAuth } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogOut = ()=>
  {
    dispatch(remove_user());
    
  }

  if (!isAuth) {
    return (
      <div className="home_page">
        <div className="container">
          <img src={logo} alt="" className="logo_image" />
          <Button
            onClick={() => {
              navigate("/login");
            }}
            bgColor="#DEE2E6"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            bgColor="#DEE2E6"
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Authenticated</h1>
        <Button onClick={userLogOut} bgColor={"#eeeeee"}>
          Log Out
        </Button>
      </div>
    );
  }
}

export default Home;
