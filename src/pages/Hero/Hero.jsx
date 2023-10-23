import React from "react";
import "./Hero.scss";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function Hero() {
  let employee = useSelector((state) => state.employee);
  const buttonstyle = {
    backgroundColor: "#F2CD14",
    color: "black",
  };

  return (
    <section id="hero">
      <MDBRow className="hero-div">
        <MDBCol md="5" className="hero-left">
          <h1>
            <span style={{ color: "#018FDC" }}>Shrikant</span> Electricals :
            <br /> Your <span style={{ color: "#f2cd14" }}> Trusted </span>
            Electrical Contractor
          </h1>
          <h5>Quality Service, Expertise, and Safety You Can Rely On</h5>
          <div>
            {employee.employee.email ? (
              <Link to={`/accounts/${employee.employee.first_name}`}>
                <Button variant="contained" style={buttonstyle}>
                  Go to my account
                </Button>
              </Link>
            ) : (
              <Link to="/form">
                <Button variant="contained" style={buttonstyle}>
                  Get a Quote
                </Button>
              </Link>
            )}
          </div>
        </MDBCol>
        <MDBCol md="7" className="hero-right">
          <img src="./Assets/Images/Heroimg.png" alt="Hero Image" />
        </MDBCol>
      </MDBRow>
    </section>
  );
}
