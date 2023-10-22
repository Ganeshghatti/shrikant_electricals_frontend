import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./Services.scss";

export default function Services() {
  return (
    <section id="services">
      <h2>Our Services</h2>
      <h6>Shrikant Electricals provides diverse electrical services for residential and commercial needs.</h6>
      <MDBRow style={{ width: "85vw"}} className="services-row1">
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/electricalinstallation.jpeg"
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                <h4 style={{ textAlign: "center" }}>
                  Electrical Installations
                </h4>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p style={{ textAlign: "center" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </p>
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/wiringandrewiring.png"
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom  component="div">
                <h4 style={{ textAlign: "center" }}>Wiring and Rewiring</h4>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p style={{ textAlign: "center" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </p>
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/electricalpanel.png"
              style={{
                objectFit: "contain",
              }}
            />
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom component="div">
                <h4 style={{ textAlign: "center" }}>Panel Upgrades</h4>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p style={{ textAlign: "center" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </p>
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
      </MDBRow>
      <MDBRow style={{ width: "85vw" }}>
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/lightbulb.png"
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                <h4 style={{ textAlign: "center" }}>Lighting Solutions</h4>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p style={{ textAlign: "center" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica</p>
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/emergency.png"
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                <h4 style={{ textAlign: "center" }}>Emergency Services</h4>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p style={{ textAlign: "center" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica</p>
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
        <MDBCol md="4">
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="./Assets/Images/services/energyefficient.png"
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                <h4 style={{ textAlign: "center" }}>
                  Energy-Efficient Solutions
                </h4>
              </Typography>
              <Typography color="text.secondary">
                <p style={{ textAlign: "center" }}></p>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </MDBCol>
      </MDBRow>
    </section>
  );
}
