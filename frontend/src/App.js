import Home from "./pages/HomePage/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import BikeRegister from "./pages/BikeRegister/BikeRegister";
import TopDropdown from "./components/TopDropdown/TopDropdown";
function App() {
  return (
    <div className="app">
      <Router>
        <TopDropdown />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/bike/register" element={<BikeRegister />} />
        </Routes>
      </Router>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
