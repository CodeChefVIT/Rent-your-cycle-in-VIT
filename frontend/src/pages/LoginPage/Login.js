import React, { useState } from "react";
import logo from "../../logo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./Login.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
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
  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    const url = "https://cycle-rent-vit.herokuapp.com/user/login";

    const toastid = toast.loading("Please Wait ....");

    axios
      .post(url, formData)
      .then(({ data }) => {
        if (data.success === true) {
          toast.update(toastid, {
            render: "Logged In",
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
      .catch(function (error) {
        toast.update(toastid, {
          render: "Some problem Occurred",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <img className="logo_image" src={logo} alt="" />
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="input_fields"
            type="text"
            placeholder="Username"
            style={{ width: "100%" }}
            value={formData.username}
            onChange={(e) => {
              setFormData((data) => ({ ...data, username: e.target.value }));
            }}
          />
          <div style={{ display: "flex", width: "100%" }}>
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
          <Button
            type="submit"
            onClick={submitForm}
            color="black"
            bgColor="#DEE2E6"
          >
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
