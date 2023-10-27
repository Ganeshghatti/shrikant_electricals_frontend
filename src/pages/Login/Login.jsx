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
  localStorage.getItem("errormessage")
  const dispatch = useDispatch();
  const buttonstylemobile = {
    backgroundColor: "#333333",
    color: "white",
    margin: "0 auto",
  };
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
        console.log("login started")
        const response = await axios.post(
          "http://localhost:5000/login",
          employeeData
        );
        console.log("Login success")
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
        localStorage.setItem("errormessage",error.message)
        seterrormessage(error.message);
      }
    } else {
      seterrormessage("Please enter email and password");
    }
  };
  return (
    <section id="login">
      <div className="login-container">
        <div className="registerInputContainer">
          <img src={mail} alt="" className="mail" style={{ width: "2.25vw" }} />
          <input
            type="text"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="registerInputContainer">
          <img src={key} alt="" className="key" style={{ width: "2.25vw" }} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={eye}
            alt=""
            className={`eye ${showPassword ? "show" : ""}`}
            onClick={togglePasswordVisibility}
            style={{ width: "2.25vw" }}
          />
        </div>
        <p
          className="register-error-message"
          style={{ color: "red", fontWeight: "600" }}
        >
          {errormessage}{localStorage.getItem("errormessage")}
        </p>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={buttonstylemobile}
        >
          Sign in
        </Button>
      </div>
    </section>
  );
};

export default Login;
