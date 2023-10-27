import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Dashboard.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [customerdata, setcustomerdata] = useState([]);
  const [employeedata, setemployeedata] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const employee = useSelector((state) => state.employee);

  const fetchData = async (tabIndex) => {
    if (tabIndex === 0) {
      try {
        const response = await axios.get(`http://localhost:5000/getformdata`, {
          headers: {
            Authorization: `Bearer ${employee.employee.token}`,
          },
        });
        console.log(response.data.customersdata)
        const reversedData = response.data.customersdata.reverse();
        setcustomerdata(reversedData);
      } catch (error) {
        console.error("Error fetching Customer Data:", error);
      }
    } else if (tabIndex === 1) {
      try {
        const response = await axios.get(
          `http://localhost:5000/getemployeesdata`,
          {
            headers: {
              Authorization: `Bearer ${employee.employee.token}`,
            },
          }
        );
        console.log(response.data);

        setemployeedata(response.data.employeesdata);
      } catch (error) {
        console.error("Error fetching Employees Data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData(value);
  }, [value]);
  return (
    <section id="dashboard">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Customer Form Data" {...a11yProps(0)} />
          <Tab label="Employees Data" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <section id="formdata">
            {customerdata.map((item, index) => (
              <MDBRow className="formdata-div" key={index}>
                <MDBCol md="4">
                  <p>
                    <b>Name :</b>
                    {item.name}
                  </p>
                  <p>
                    <b>Phone no.</b> : {item.phone}
                  </p>
                  <p>
                    <b>Email : </b>
                    {item.email}
                  </p>
                  <p>
                    <b>KW/HP : </b>
                    {item.KW_HP}
                  </p>
                  <p>
                    <b>LT4 / LT5: </b>
                    {item.LT}
                  </p>
                  <p>
                    <b>Balake: </b>
                    {item.Balake}
                  </p>
                  <p>
                    <b>Other querries : </b>
                    {item.query ? item.query : "none"}
                  </p>
                </MDBCol>
                <MDBCol md="8">
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <a href={item.NeighboursBill}>
                      <img
                        src={item.NeighboursBill}
                        alt="NeighboursBill"
                        className="formdata-img"
                      />
                      <p style={{ textAlign: "center" }}>NeighboursBill</p>
                    </a>
                    <a href={item.BorewellCertificate}>
                      <img
                        src={item.BorewellCertificate}
                        alt="BorewellCertificate"
                        className="formdata-img"
                      />
                      <p style={{ textAlign: "center" }}>BorewellCertificate</p>
                    </a>
                    <a href={item.AADHARCard}>
                      <img
                        src={item.AADHARCard}
                        alt="AADHARCard"
                        className="formdata-img"
                      />
                      <p style={{ textAlign: "center" }}>AADHARCard</p>
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <a href={item.RTC}>
                      <img src={item.RTC} alt="RTC" className="formdata-img" />
                      <p style={{ textAlign: "center" }}>RTC</p>
                    </a>
                    <a href={item.BorewellCertificate}>
                      <img
                        src={item.BorewellCertificate}
                        alt="BorewellCertificate"
                        className="formdata-img"
                      />
                      <p style={{ textAlign: "center" }}>BorewellCertificate</p>
                    </a>
                    <a href={item.TaxReceipt}>
                      <img
                        src={item.TaxReceipt}
                        alt="TaxReceipt"
                        className="formdata-img"
                      />
                      <p style={{ textAlign: "center" }}>TaxReceipt</p>
                    </a>
                  </div>
                </MDBCol>
              </MDBRow>
            ))}
          </section>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <section id="employees-details">
            {employeedata.map((item, index) => (
              <div className="employees-div">
                <h5 style={{ fontWeight: "900", padding: "20px 0" }}>
                  {item.first_name} &nbsp;
                  {item.last_name}
                </h5>
                <p>
                  <b>Id: </b>
                  {item._id}
                </p>
                <p>
                  <b>Email: </b>
                  {item.email}
                </p>
                <p>
                  <b>Password: </b>
                  {item.password}
                </p>
                <p>
                  <b>Gender: </b>
                  {item.gender}
                </p>
                <p>
                  <b>Salary: </b>
                  {item.Salary}
                </p>
                <p>
                  <b>EPF: </b>
                  {item.EPF}
                </p>
                <p>
                  <b>ESI: </b>
                  {item.ESI}
                </p>
                <p>
                  <b>Tenure: </b>
                  {item.Tenure}
                </p>
              </div>
            ))}
          </section>
        </TabPanel>
      </Box>
    </section>
  );
}
