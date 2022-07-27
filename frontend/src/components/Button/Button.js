import React from "react";
import { ButtonBase } from "@mui/material";
function CustomButton({ type = "button", children, bgColor, color, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      type={type}
      sx={{
        borderRadius: "20px",
        padding: "10px 0",
        width: "140px",
        border: "none",
        backgroundColor: bgColor,
        color,
        margin: "10px",
        fontSize: "2rem",
        fontWeight: "100px",
        alignSelf: "center",
      }}
    >
      {children}
    </ButtonBase>
  );
}

export default CustomButton;
