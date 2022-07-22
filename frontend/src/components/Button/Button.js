import React from 'react'
import { ButtonBase } from '@mui/material'
function CustomButton ({ children, bgColor, onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        borderRadius: '20px',
        padding: '10px 0',
        width: '140px',
        border: 'none',
        backgroundColor: bgColor,
        margin: '10px',
        fontSize: '2rem',
        fontWeight: '100px'
      }}
    >
      {children}
    </ButtonBase>
  )
}

export default CustomButton
