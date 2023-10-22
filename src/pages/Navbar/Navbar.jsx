import React, { useState } from "react";
import { logout } from "../../features/Employee";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menu, setmenu] = useState(false);

  const dispatch = useDispatch();
  let employee = useSelector((state) => state.employee);

  const logoutf = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  };

  const buttonstyle = {
    backgroundColor: "#333333",
    color: "white",
  };
  const buttonstylemobile = {
    backgroundColor: "#333333",
    color: "white",
    width: "40vw",
    margin: "0 auto",
  };

  const menuf = () => {
    setmenu(!menu);
  };
  return (
    <nav>
      {menu ? (
        <>
          <div className="mobile-overlay" onClick={menuf}></div>
          <div className="mobile-menu">
            <ul>
              <li onClick={menuf}>
                <a href="/#hero">Home</a>
              </li>
              <li onClick={menuf}>
                <a href="/#about">About</a>
              </li>
              <li onClick={menuf}>
                <a href="/#services">Services</a>
              </li>
              <li onClick={menuf}>
                <a href="/#contact">Contact</a>
              </li>
            </ul>
            {employee.employee.email ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 className="loggedinash5">{employee && "Logged in as"}</h5>
                <h5 className="loggedinash5">{employee && employee.employee.email}</h5>
                {employee && (
                  <Button
                    variant="contained"
                    onClick={logoutf}
                    style={buttonstylemobile}
                  >
                    Logout
                  </Button>
                )}
              </div>
            ) : (
              <Link to="/login" onClick={menuf}>
                <Button variant="contained" style={buttonstylemobile}>
                  Employee Login
                </Button>
              </Link>
            )}
          </div>
        </>
      ) : null}

      <img src="./Assets/Images/logo.png" className="nav-logo-img" />
      {window.innerWidth > 700 ? (
        <>
          <ul>
            <li>
              <a href="/#hero">Home</a>
            </li>
            <li>
              <a href="/#about">About</a>
            </li>

            <li>
              <a href="/#services">Services</a>
            </li>

            <li>
              <a href="/#contact">Contact</a>
            </li>
          </ul>
          {employee.employee.email ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5 className="loggedinash5">
                  {employee && "Logged in as"}
                </h5>
                <h5 className="loggedinash5">{employee && employee.employee.email}</h5>
              </div>

              {employee && (
                <Button
                  variant="contained"
                  onClick={logoutf}
                  style={buttonstyle}
                >
                  Logout
                </Button>
              )}
            </>
          ) : (
            <Link to="/login">
              <Button variant="contained" style={buttonstyle}>
                Employee Login
              </Button>
            </Link>
          )}
        </>
      ) : (
        <FontAwesomeIcon
          icon={faBars}
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={menuf}
        />
      )}
    </nav>
  );
}
