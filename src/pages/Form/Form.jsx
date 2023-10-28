import React, { useState, useEffect, Children } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/Firebase";
import "./Form.scss";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";

const storage = getStorage(app);

const Form = () => {
  const [formData, setformData] = useState({
    Balake: "",
    KW_HP: "",
    LT: "",
    name: "",
    email: "",
    phoneNumber: "",
    query: "",
  });
  const [NOCimg, setNOCimg] = useState({
    img: null,
    name: null,
  });
  const [TaxReceiptimg, setTaxReceiptimg] = useState({
    img: null,
    name: null,
  });
  const [AADHARCardimg, setAADHARCardimg] = useState({
    img: null,
    name: null,
  });
  const [NeighboursBillimg, setNeighboursBillimg] = useState({
    img: null,
    name: null,
  });
  const [BorewellCertificateimg, setBorewellCertificateimg] = useState({
    img: null,
    name: null,
  });
  const [RTCimg, setRTCimg] = useState({
    img: null,
    name: null,
  });
  const images = [
    NOCimg,
    TaxReceiptimg,
    AADHARCardimg,
    NeighboursBillimg,
    BorewellCertificateimg,
    RTCimg,
  ];

  const imageURLs = {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      "Balake",
      "KW_HP",
      "LT",
      "name",
      "email",
      "phoneNumber",
    ];
    const emptyFields = [];

    requiredFields.forEach((field) => {
      if (formData[field] === "") {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map((field) => {
        if (field === "Balake") {
          return "Balake Field";
        } else if (field === "KW_HP") {
          return "KW/HP Field";
        }
        return field;
      });

      const errorMessage = `Please fill in the following fields: ${emptyFieldNames.join(
        ", "
      )}`;
      alert(errorMessage);
      return;
    }
    if (
      NOCimg.img === null ||
      TaxReceiptimg.img === null ||
      AADHARCardimg.img === null ||
      NeighboursBillimg.img === null ||
      BorewellCertificateimg.img == null ||
      RTCimg.img === null
    ) {
      alert("Please upload all images");
      return;
    }
    const time = moment().format("MMMM Do YYYY, h:mm:ss a");
    for (let i = 0; i < 6; i++) {
      const storageRef = ref(
        storage,
        `images/${formData.name}/${time}/${images[i].name}/${images[i].img.name}`
      );
      await uploadBytes(storageRef, images[i].img)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadURL) => {
          console.log(images[i].name, downloadURL);
          imageURLs[images[i].name] = downloadURL;
          console.log(imageURLs);
        })
        .catch((error) => {
          console.error(`Error uploading ${images[i].name}:`, error);
        });
    }

    try {
      console.log("data being sent to backend", formData, imageURLs);
      const response = await axios.post("https://shrikant-electricals.onrender.com/form", {
        ...formData,
        imageURLs: imageURLs,
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const buttonstyle = {
    backgroundColor: "#F2CD14",
    color: "black",
  };
  return (
    <section id="form">
      <h4>Enter your data</h4>
      <MDBRow className="form-container">
        <MDBCol md="6" className="form-container-div">
          <TextField
            id="outlined-required"
            name="name"
            label="Name"
            onChange={handleInputChange}
            value={formData.name}
            InputProps={{
              startAdornment: <div style={{ marginRight: "20px" }} />,
            }}
          />
          <TextField
            id="outlined-required"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <div style={{ marginRight: "20px" }} />,
            }}
          />
        </MDBCol>
        <MDBCol md="6" className="form-container-div">
          <TextField
            id="outlined-required"
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <span style={{ marginRight: "20px" }} />,
            }}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="form-container">
        <MDBCol md="6" className="form-container-div">
          <TextField
            id="outlined-required"
            name="KW_HP"
            label="Number of KW/HP"
            value={formData.KW_HP}
            onChange={handleInputChange}
            type="number"
            InputProps={{
              startAdornment: <div style={{ marginRight: "20px" }} />,
            }}
          />
          <div>
            <label htmlFor="balake">Choose Balake:</label>
            <select
              name="Balake"
              value={formData.Balake}
              onChange={handleInputChange}
              style={{ width: "250px", padding: "15px" }}
            >
              <option value={null}>Select an option</option>
              <option value="Graha balake">Graha balake</option>
              <option value="Vanijya balake">Vanijya balake</option>
              <option value="Uddime balake">Uddime balake</option>
              <option value="Krishi Balake">Krishi Balake</option>
            </select>
          </div>
        </MDBCol>
        <MDBCol md="6" className="form-container-div">
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <label>Choose:</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="radio"
                name="LT"
                value="LT4"
                checked={formData.LT === "LT4"}
                onChange={handleInputChange}
              />
              <label htmlFor="LT4">LT4</label>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="radio"
                name="LT"
                value="LT5"
                checked={formData.LT === "LT5"}
                onChange={handleInputChange}
              />
              <label htmlFor="LT5">LT5</label>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      <h4>Upload Required Documents here</h4>
      <MDBRow className="form-container">
        <MDBCol md="6" className="form-container-div">
          <div style={{ width: "60%" }}>
            <label htmlFor="TaxReceipt">Tax Receipt:</label>
            <input
              type="file"
              id="TaxReceipt"
              name="TaxReceipt"
              onChange={(e) => {
                setTaxReceiptimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="NOC">NOC:</label>
            <input
              type="file"
              id="NOC"
              name="NOC"
              onChange={(e) => {
                setNOCimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="BorewellCertificate">Borewell Certificate:</label>
            <input
              type="file"
              name="BorewellCertificate"
              id="BorewellCertificate"
              onChange={(e) => {
                setBorewellCertificateimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
        </MDBCol>
        <MDBCol md="6" className="form-container-div">
          <div>
            <label htmlFor="AADHARCard">AADHAR Card:</label>
            <input
              type="file"
              id="AADHARCard"
              name="AADHARCard"
              onChange={(e) => {
                setAADHARCardimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="NeighboursBill">Neighbour's Current Bill:</label>
            <input
              type="file"
              id="NeighboursBill"
              name="NeighboursBill"
              onChange={(e) => {
                setNeighboursBillimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="RTC">RTC:</label>
            <input
              type="file"
              name="RTC"
              id="RTC"
              onChange={(e) => {
                setRTCimg({
                  img: e.target.files[0],
                  name: e.target.name,
                });
              }}
            />
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow className="form-container">
        <MDBCol md="6" className="form-container-div">
          <div>
            <label htmlFor="query">Any other query:</label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <Button
            variant="contained"
            style={buttonstyle}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </MDBCol>
        <MDBCol md="6" className="form-container-div"></MDBCol>
      </MDBRow>
    </section>
  );
};

export default Form;
