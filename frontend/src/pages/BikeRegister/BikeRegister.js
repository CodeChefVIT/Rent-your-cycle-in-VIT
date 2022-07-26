import React from "react";
import logo from "../../logo.svg";
import "./BikeRegister.css";
function BikeRegister() {
  return (
    <div className="bike_register">
      <div className="form_container">
        <img src={logo} alt="" className="logo_image" />
        <h1 className="bike_details_header">Bike Details</h1>
        <form className="bike_details_form">
          <input type="text" className="input_field" placeholder="Brand*" />
          <input type="text" className="input_field" placeholder="Ad Title*" />
          <p className="input_subtitle">
            Mention the key features of your item(e.g brand, model, age)
          </p>
        </form>
      </div>
    </div>
  );
}

export default BikeRegister;
