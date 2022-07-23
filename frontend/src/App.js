import logo from './logo.svg'
import Home from './pages/HomePage/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage/Login'
function App () {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
