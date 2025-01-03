import React, { useContext } from "react";
import { useState } from "react";
import "./Starter.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleRegisterClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formValues.email.trim()) {
      validationErrors.email = "email is required";
      alert("Please provide email.");
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validationErrors.email = "email is not valid";
      alert("Email is not valid.");
    }

    if (!formValues.password.trim()) {
      validationErrors.password = "password is required";
      alert("Please provide password.");
    } else if (formValues.password.length < 4) {
      validationErrors.password = "password must be more than 4 characters";
      alert("Password must be more than 4 characters");
    } else if (formValues.password.length > 10) {
      validationErrors.password =
        "password must not be more than 10 characters";
      alert("Password must not be more than 10 characters");
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          formValues,
          { withCredentials: true }
        );

        if (!response.data.success) {
          alert(response.data.message);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        alert("Login Failed!");
      }
    }
  };

  return (
    <div className="bg-login">
      <div className="company-logo1">
        {/* <img src={logo} alt="OptiPixel Logo" className="logo-image" /> */}
        OptiPixel
      </div>
      <form className="container-login" onSubmit={handleSubmit}>
        <div className="col form-box login">
          <p className="title">Login</p>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="button1">
          Login
        </button>
        <button
          className="toggle-form register-link"
          onClick={handleRegisterClick}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
