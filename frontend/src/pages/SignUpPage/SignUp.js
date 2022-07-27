import React, { useState } from "react";
import logo from "../../logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "./SignUp.css";

import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    password: "",
    username: "",
    confirmPassword: "",
    email: "",
    block: "a",
    roomno: "",
    phone: "",
  });
  const navigate = useNavigate();

  const [revealPassword, setRevealPassword] = useState(false);
  const handleSubmit = () => {
    console.log(formData);
  };
  const toggleVisibility = (e) => {
    e.preventDefault();
    setRevealPassword(!revealPassword);
  };
  const visibilityIconStyle = {
    color: "white",
    fontSize: "2rem",
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    const url = "https://cycle-rent-vit.herokuapp.com/user/register";
    const toastid = toast.loading("Please Wait ...");
    axios
      .post(url, formData)
      .then(({ data }) => {
        if (data.success === true) {
          toast.update(toastid, {
            render: "Signed up successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          navigate("/");
        } else {
          toast.update(toastid, {
            render: "Some problem Occurred",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        toast.update(toastid, {
          render: "Some problem Occurred",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="signup_page">
      <div className="signup_container">
        <img className="logo_image" src={logo} alt="" />
        <form className="signup_form" onSubmit={handleSubmit}>
          <input
            className="input_fields"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData((data) => ({ ...data, name: e.target.value }));
            }}
          />

          <input
            className="input_fields"
            type="text"
            placeholder="Registration Number"
            value={formData.regno}
            onChange={(e) => {
              setFormData((data) => ({ ...data, regno: e.target.value }));
            }}
          />
          <div className="multiinput_line">
            <select
              style={{ backgroundColor: "transparent", color: "white" }}
              className="input_fields"
              type="text"
              placeholder="Block"
              value={formData.block}
              onChange={(e) => {
                setFormData((data) => ({ ...data, fullname: e.target.value }));
              }}
            >
              <option value="a">Block A</option>
              <option value="b">Block B</option>
              <option value="c">Block C</option>
              <option value="d">Block D</option>
              <option value="e">Block E</option>
              <option value="f">Block F</option>
              <option value="g">Block G</option>
              <option value="h">Block H</option>
            </select>
            <input
              className="input_fields"
              type="text"
              placeholder="Room No"
              value={formData.roomno}
              onChange={(e) => {
                setFormData((data) => ({ ...data, roomno: e.target.value }));
              }}
            />
          </div>
          <input
            className="input_fields"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData((data) => ({
                ...data,
                username: e.target.value,
                email: e.target.value,
              }));
            }}
          />
          <div style={{ display: "flex" }} className="password_field">
            <input
              className="input_fields"
              type={revealPassword ? "text" : "password"}
              placeholder="Password"
              style={{ marginRight: "-2.5rem" }}
              value={formData.password}
              onChange={(e) => {
                setFormData((data) => ({ ...data, password: e.target.value }));
              }}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="visibility_button"
            >
              {revealPassword ? (
                <VisibilityOffIcon sx={visibilityIconStyle} />
              ) : (
                <VisibilityIcon sx={visibilityIconStyle} />
              )}
            </button>
          </div>
          <div style={{ display: "flex" }} className="password_field">
            <input
              className="input_fields"
              type={revealPassword ? "text" : "password"}
              placeholder="Repeat Password"
              style={{ marginRight: "-2.5rem" }}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  confirmPassword: e.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="visibility_button"
            >
              {revealPassword ? (
                <VisibilityOffIcon sx={visibilityIconStyle} />
              ) : (
                <VisibilityIcon sx={visibilityIconStyle} />
              )}
            </button>
          </div>
          <input
            className="input_fields"
            type="text"
            placeholder="Whatsapp Number"
            value={formData.phone}
            onChange={(e) => {
              setFormData((data) => ({ ...data, phone: e.target.value }));
            }}
          />

          <Button
            type="submit"
            onClick={submitForm}
            color="black"
            bgColor="#DEE2E6"
          >
            Sign Up
          </Button>
          <Link className="login_link" to="/login">
            Already a User?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
