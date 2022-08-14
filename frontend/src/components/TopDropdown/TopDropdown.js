import React, { useState } from "react";
import "./TopDropdown.css";
import { Link } from "react-router-dom";
import { userSelector } from "../../reducers/userSlice";
import { useSelector } from "react-redux";
function TopDropdown() {
  const [open, setOpen] = useState(false);
  const { isAuth } = useSelector(userSelector);
  return (
    <div
      className={"top-dropdown" + (open ? " open" : "")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="top-patch">
        <div className="circle-navbar">
          <img className="logo-image" src="logo.svg" alt="" />
          {!isAuth && open && (
            <div className="auth_links">
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopDropdown;
