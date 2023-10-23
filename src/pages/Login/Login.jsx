import React, { useState, useEffect } from "react";
import axios from "axios";
import key from "../../assets/Images/key.svg";
import eye from "../../assets/Images/eye.svg";
import mail from "../../assets/Images/mail.svg";
import { useDispatch } from "react-redux";
import { EmployeeSlice } from "../../features/Employee";
import { login } from "../../features/Employee";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import "./Login.scss";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { startLoading, stopLoading } from "../../features/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, seterrormessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  let employee = useSelector((state) => state.employee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      email: email,
      password: password,
    };
    if (employeeData.email && employeeData.password) {
      try {
        dispatch(startLoading());
        const response = await axios.post(
          "https://shrikant-electricals.onrender.com/login",
          employeeData
        );
        dispatch(stopLoading());
        const employee = {
          email: response.data.email,
          token: response.data.token,
          first_name: response.data.first_name,
          isauthenticated: true,
        };
        localStorage.setItem("employee", JSON.stringify(employee));
        dispatch(
          login({
            email: employee.email,
            token: employee.token,
            first_name: employee.first_name,
            isauthenticated: true,
          })
        );
        const username = employee.first_name;
        console.log(username);
        window.location.href = `/accounts/${username}`;
      } catch (error) {
        dispatch(stopLoading());
        seterrormessage(error.response.data);
      }
    } else {
      seterrormessage("Please enter email and password");
    }
  };
  return (
    <section id="login">
      <div className="registerInputContainer">
        <img src={mail} alt="" className="lIcon" />
        <input
          type="text"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="registerInputContainer">
        <img src={key} alt="" className="lIcon" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={eye}
          alt=""
          className={`key ${showPassword ? "show" : ""}`}
          onClick={togglePasswordVisibility}
        />
      </div>

      <p className="register-error-message">{errormessage}</p>
      <Button variant="contained" onClick={handleSubmit}>
        Sign in
      </Button>
    </section>
  );
};

export default Login;
