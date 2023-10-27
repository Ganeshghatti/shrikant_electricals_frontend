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
import NotFound from "../../components/NotFound/PageNotFound";
import UserNotFound from "../../components/NotFound/UserNotFound";
import { startLoading, stopLoading } from "../../features/Loader";
import Spinner from "react-bootstrap/esm/Spinner";
import Button from "@mui/material/Button";
const moment = require("moment");

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
  const [load, setload] = useState(false);
  const [attendancemarked, setattendancemarked] = useState(true);
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
          console.log("account page");
          const response = await axios.get(
            `http://localhost:5000/account/${username}`,
            {
              headers: {
                Authorization: `Bearer ${employeeData.token}`,
              },
            }
          );
          setaccountdetails(response.data);
          setload(true);
          console.log(response.data.user.Attendence);
          console.log(
            response.data.user.Attendence[
              response.data.user.Attendence.length - 1
            ].day
          );
          console.log(currentDay);
          if (
            (response.data.user.Attendence[
              response.data.user.Attendence.length - 1
            ].day !== currentDay)
          ) {
            setattendancemarked(false);
          }
        } catch (error) {
          window.location.href = `/login`;
        }
      }
    };
    getaccdata();
  }, [employee]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const buttonstyle = {
    backgroundColor: "#F2CD14",
    color: "black",
  };

  const currentDay = moment().format("dddd");
  const markattendencef = async () => {
    try {
      console.log(employeeData.token);
      const response = await axios.post(
        "http://localhost:5000/markattendence",
        {},
        {
          headers: {
            Authorization: `Bearer ${employeeData.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
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
              {currentDay === "Sunday" || currentDay === "Saturday" ? (
                <div>
                  <h1 style={{ textAlign: "center" }}>
                    Today is a holiday! Enjoy!!
                  </h1>
                </div>
              ) : (
                <>
                  {attendancemarked ? (
                    <div>
                      <h1 style={{ textAlign: "center" }}>
                        You Have already marked the attendance for today
                      </h1>
                    </div>
                  ) : (
                    <div>
                      <h1>Mark Today's Attendance</h1>
                      <Button
                        variant="contained"
                        style={buttonstyle}
                        onClick={markattendencef}
                      >
                        Click here!
                      </Button>
                    </div>
                  )}
                </>
              )}
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
