import React, { useState } from 'react'
import logo from '../../logo.svg'
import './Home.css'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
function Home () {
  const [userAuthenticated] = useState(false)
  const navigate = useNavigate()
  if (!userAuthenticated) {
    return (
      <div className='home_page'>
        <div className='container'>
          <img src={logo} alt='' className='logo_image' />
          <Button
            onClick={() => {
              navigate('/login')
            }}
            bgColor='#DEE2E6'
          >
            Login
          </Button>
          <Button bgColor='#DEE2E6'>Sign Up</Button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Authenticated</h1>
      </div>
    )
  }
}

export default Home
