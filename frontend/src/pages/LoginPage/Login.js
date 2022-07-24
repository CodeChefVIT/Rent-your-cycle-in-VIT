import React, { useState } from "react";
import logo from "../../logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./Login.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
function Login() {
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
    <div className="login_page">
      <div className="login_container">
        <img src={logo} alt="" />
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="input_fields"
            type="text"
            placeholder="Username"
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <input
              className="input_fields"
              type={revealPassword ? "text" : "password"}
              placeholder="Password"
              style={{ marginRight: "-2.5rem" }}
            />
            <button
              style={{ cursor: "pointer" }}
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
          <FormControlLabel
            sx={{
              alignSelf: "flex-start",
              "& .MuiTypography-root": {
                fontSize: "2rem",
              },
              "& .MuiSvgIcon-root": { fontSize: 25 },
            }}
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <Button color="black" bgColor="#DEE2E6">
            Login
          </Button>
          <Link className="register_link" to={"/register"}>
            Not a User? Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
