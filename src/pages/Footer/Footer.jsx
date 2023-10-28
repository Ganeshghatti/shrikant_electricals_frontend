import React from "react";
import "./Footer.scss";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "./logo.png";

export default function Footer() {
  return (
    <section className="footer">
      <MDBFooter
        className="text-center text-lg-start text-muted"
        style={{
          width: "100vw",
          backgroundColor: "#040f21",
          color: "white",
        }}
      >
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img
                  src={logo}
                  alt="Custom Icon"
                  className="me-3"
                  style={{ width: "75px" }}
                />
                <h5>Shrikanth Electricals</h5>
                <p>Your Trusted Electrical Contractor</p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="/#">
                    HOME
                  </a>
                </p>
                <p>
                  <a href="/#about">
                    ABOUT
                  </a>
                </p>
                <p>
                  <a href="/#contact">
                    CONTACT US
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Resources</h6>
                <p>
                  <a href="/#">
                    BLOG
                  </a>
                </p>
                <p>
                  <a href="/#">
                    EVENTS
                  </a>
                </p>
                <p>
                  <a href="/#">
                    PRIVACY POLICY
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  <span>
                    <a href="https://maps.app.goo.gl/kWq35bGFmadtCzqj7">
                      Samdhana, Shaktinagar, Devikere, Sirsi -
                      <span style={{ color: "blue" }}>view on map</span>
                    </a>
                  </span>
                </p>
                <p>
                  <a href="mailto:shrikantelectricals944@gmail.com">
                    shrikantelectricals944@gmail.com
                  </a>
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" />
                  <a href="tel:9448441090">Mob-9448441090</a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <p style={{color:"grey"}}>© 2023 Copyright: shrikantelectricals944@gmail.com</p>
        </div>
      </MDBFooter>
    </section>
  );
}
