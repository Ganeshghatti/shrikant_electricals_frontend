import React from "react";
import "./About.scss";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

export default function About() {
  return (
    <section className="About" id="about">
      <MDBRow style={{ width: "90vw" }}>
        <MDBCol
          md="6"
          className="d-flex  flex-column justify-content-center about-left"
        >
          <h6>About us</h6>
          <h2>About<span style={{ color: "#018FDC" }}> Shrikant Electricals</span> </h2>
          <p>
            At Shrikant Electricals, we take pride in our reputation as one of
            the leading electrical contractors in [Location]. Our journey began
            [Year Established], and since then, we've been dedicated to
            delivering top-notch electrical services. Our team is comprised of
            highly skilled and certified electricians who prioritize safety and
            quality in every project.
          </p>
        </MDBCol>
        <MDBCol md="6" className="d-flex  flex-column align-items-center">
          <img
            src="./Assets/Images/about.jpg"
            alt=""
            className="about-img"
          />
        </MDBCol>
      </MDBRow>
    </section>
  );
}
