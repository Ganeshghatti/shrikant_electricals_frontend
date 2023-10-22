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
  const [value, setValue] = React.useState(0);
  const [error, setError] = useState(null);
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
  console.log("accountdetails", accountdetails);
  const employeeData = {
    email: employee.employee.email,
    token: employee.employee.token,
  };
  useEffect(() => {
    const getaccdata = async () => {
      if (employeeData.token) {
        try {
          const response = await axios.get(
            `https://shrikant-electricals.onrender.com/account/${username}`,
            {
              headers: {
                Authorization: `Bearer ${employeeData.token}`,
              },
            }
          );
          setaccountdetails(response.data);
          console.log(response.data);
          console.log("accountdetails", accountdetails);
        } catch (error) {
          console.log(error.message);
          setError(error);
          console.log("accountdetails if error", accountdetails);
        }
      }
    };
    getaccdata();
  }, [employee]);

  if (error) {
    <Navigate to="/user-not-found" />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section id="account">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Attendence" {...a11yProps(0)} />
            <Tab label="Account Details" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <section>
            <h1>This is accounts section</h1>
          </section>
          {/* <section>
            <span>{accountdetails.user.first_name} &nbsp;</span>
            <span>{accountdetails.user.last_name}</span>
            <p>Email: {accountdetails.user.email}</p>
            <p>Gender: {accountdetails.user.gender}</p>
            <p>Salary: {accountdetails.user.Salary}</p>
            <p>EPF: {accountdetails.user.EPF}</p>
            <p>ESI: {accountdetails.user.ESI}</p>
            <p>Tenure: {accountdetails.user.Tenure}</p>
          </section> */}
        </CustomTabPanel>
      </Box>
    </section>
  );
}
