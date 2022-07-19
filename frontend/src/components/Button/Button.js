import React from "react";
import { ButtonBase } from "@mui/material";
function CustomButton({ children, bgColor }) {
  return (
    <ButtonBase
      sx={{
        borderRadius: "20px",
        padding: "10px 0",
        width: "140px",
        border: "none",
        backgroundColor: bgColor,
        margin: "10px",
        fontSize: "2rem",
        fontFamily: "'PT Sans', sans-serif",
        fontWeight: "100px",
      }}
    >
      {children}
    </ButtonBase>
  );
}

export default CustomButton;
