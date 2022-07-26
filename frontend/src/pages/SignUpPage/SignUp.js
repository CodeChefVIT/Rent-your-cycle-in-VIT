import React, { useState } from "react";
import logo from "../../logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./SignUp.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({ username: "", password: "" });
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

  return (
    <div className="signup_page">
      <div className="signup_container">
        <img src={logo} alt="" />
        <form className="signup_form" onSubmit={handleSubmit}>
          <input className="input_fields" type="text" placeholder="Full Name" />

          <input
            className="input_fields"
            type="text"
            placeholder="Registration Number"
          />
          <div className="multiinput_line">
            <select
              style={{ backgroundColor: "transparent", color: "white" }}
              className="input_fields"
              type="text"
              placeholder="Block"
            >
              <option value="a">Block A</option>
              <option value="a">Block B</option>
              <option value="a">Block C</option>
              <option value="a">Block D</option>
              <option value="a">Block E</option>
              <option value="a">Block F</option>
              <option value="a">Block G</option>
              <option value="a">Block H</option>
            </select>
            <input className="input_fields" type="text" placeholder="Room No" />
          </div>
          <input
            className="input_fields"
            type="text"
            placeholder="Phone Number"
          />
          <div style={{ display: "flex" }} className="password_field">
            <input
              className="input_fields"
              type={revealPassword ? "text" : "password"}
              placeholder="Password"
              style={{ marginRight: "-2.5rem" }}
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
          />

          <Button color="black" bgColor="#DEE2E6">
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
