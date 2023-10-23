import React, { useEffect, useState } from "react";
import "./Account.scss";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../NotFound/PageNotFound";
import UserNotFound from "../NotFound/UserNotFound";
import { startLoading, stopLoading } from "../../features/Loader";
import Spinner from "react-bootstrap/esm/Spinner";
import Button from "@mui/material/Button";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Account() {
  const dispatch = new useDispatch();
  const [value, setValue] = React.useState(0);
  const [error, setError] = useState(null);
  const [load, setload] = useState(false);
  const [accountdetails, setaccountdetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    EPF: "",
    ESI: "",
    Salary: "",
    Tenure: "",
  });
  const employee = useSelector((state) => state.employee);

  const { username } = useParams();

  const employeeData = {
    email: employee.employee.email,
    token: employee.employee.token,
  };

  useEffect(() => {
    const getaccdata = async () => {
      if (employeeData.token) {
        try {
          console.log("object");
          const response = await axios.get(
            `https://shrikant-electricals.onrender.com/account/${username}`,
            {
              headers: {
                Authorization: `Bearer ${employeeData.token}`,
              },
            }
          );
          setaccountdetails(response.data);
          console.log(accountdetails);
          setload(true);
        } catch (error) {
          setError(error);
        }
      }
    };
    getaccdata();
  }, [employee]);

  if (error) {
    console.log("error here");
    return <Navigate to="/user-not-found" />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const buttonstyle = {
    backgroundColor: "#F2CD14",
    color: "black",
  };
  return (
    <section id="account">
      {accountdetails ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Attendence" {...a11yProps(0)} />
              <Tab label="Account Details" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <section id="account-attendence">
              <div>
                <h1>Mark Todays Attendence</h1>
                <Button variant="contained" style={buttonstyle}>
                  Click here!
                </Button>
              </div>
              <div>
                <h1>This Week Stats</h1>
                <Button variant="contained" style={buttonstyle}>
                  Click here!
                </Button>
              </div>
              <div>
                <h1>This Month Stats</h1>
                <Button variant="contained" style={buttonstyle}>
                  Click here!
                </Button>
              </div>
            </section>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {load && (
              <section id="account-details">
                <h5 style={{ fontWeight: "900", padding: "20px 0" }}>
                  {accountdetails.user.first_name} &nbsp;
                  {accountdetails.user.last_name}
                </h5>
                <p>
                  <b>Email: </b>
                  {accountdetails.user.email}
                </p>
                <p>
                  <b>Gender: </b>
                  {accountdetails.user.gender}
                </p>
                <p>
                  <b>Salary: </b>
                  {accountdetails.user.Salary}
                </p>
                <p>
                  <b>EPF: </b>
                  {accountdetails.user.EPF}
                </p>
                <p>
                  <b>ESI: </b>
                  {accountdetails.user.ESI}
                </p>
                <p>
                  <b>Tenure: </b>
                  {accountdetails.user.Tenure}
                </p>
              </section>
            )}
          </CustomTabPanel>
        </Box>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
