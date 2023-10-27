import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    NOC: "",
    TaxReceipt: "",
    AADHARCard: "",
    NeighboursBill: "",
    BorewellCertificate: "",
    RTC: "",
    balake: "",
    KW_HP: "",
    LT: "",
    name: "",
    email: "",
    phoneNumber: "",
    query: "",
  });
  const [NOC, setNOC] = useState(null);
  const [TaxReceipt, setTaxReceipt] = useState(null);
  const [AADHARCard, setAADHARCard] = useState(null);
  const [NeighboursBill, setNeighboursBill] = useState(null);
  const [BorewellCertificate, setBorewellCertificate] = useState(null);
  const [RTC, setRTC] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleFileChange = (e, stateSetter) => {
    stateSetter(e.target.files[0]);
  };

  const handleSubmit = () => {
    const filesToUpload = [
      NOC,
      TaxReceipt,
      AADHARCard,
      NeighboursBill,
      BorewellCertificate,
      RTC,
    ];
    if (filesToUpload.some((file) => file === null)) {
      console.error("Please select all images.");
      return;
    }

    const promises = [];
    const time = moment().format("MMMM Do YYYY, h:mm:ss a");

    const uploadImage = (documentName, file) => {
      const storageRef = ref(
        storage,
        `images/${formData.name}/${time}/${documentName}/${file.name}`
      );
      promises.push(
        uploadBytes(storageRef, file)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((downloadURL) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [documentName]: downloadURL,
            }));
            console.log(formData);
          })
          .catch((error) => {
            console.error(`Error uploading ${documentName}:`, error);
          })
      );
    };

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      uploadImage(
        [
          "NOC",
          "TaxReceipt",
          "AADHARCard",
          "NeighboursBill",
          "BorewellCertificate",
          "RTC",
        ][i],
        file
      );
    }

    Promise.all(promises)
      .then(() => {
        setSubmitClicked(true);
        sendFormDataToBackend(formData);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };
  const sendFormDataToBackend = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/form", data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
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
            InputProps={{
              startAdornment: <div style={{ marginRight: "20px" }} />,
            }}
          />
          <div>
            <label htmlFor="balake">Choose Balake:</label>
            <select
              name="balake"
              value={formData.balake}
              onChange={handleInputChange}
              style={{width:"250px" , padding:"15px"}}
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
          <div style={{ display: "flex", flexDirection: "row",gap:"20px" }}>
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
          <div style={{width:"60%"}}>
            <label htmlFor="TaxReceipt">Tax Receipt:</label>
            <input
              type="file"
              id="TaxReceipt"
              onChange={(e) => handleFileChange(e, setTaxReceipt)}
            />
          </div>
          <div>
            <label htmlFor="NOC">NOC:</label>
            <input
              type="file"
              id="NOC"
              onChange={(e) => handleFileChange(e, setNOC)}
            />
          </div>
          <div>
            <label htmlFor="BorewellCertificate">Borewell Certificate:</label>
            <input
              type="file"
              id="BorewellCertificate"
              onChange={(e) => handleFileChange(e, setBorewellCertificate)}
            />
          </div>
        </MDBCol>
        <MDBCol md="6" className="form-container-div">
          <div>
            <label htmlFor="AADHARCard">AADHAR Card:</label>
            <input
              type="file"
              id="AADHARCard"
              onChange={(e) => handleFileChange(e, setAADHARCard)}
            />
          </div>
          <div>
            <label htmlFor="NeighboursBill">Neighbour's Current Bill:</label>
            <input
              type="file"
              id="NeighboursBill"
              onChange={(e) => handleFileChange(e, setNeighboursBill)}
            />
          </div>
          <div>
            <label htmlFor="RTC">RTC:</label>
            <input
              type="file"
              id="RTC"
              onChange={(e) => handleFileChange(e, setRTC)}
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
