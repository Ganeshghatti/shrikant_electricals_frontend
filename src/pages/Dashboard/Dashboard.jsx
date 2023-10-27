import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Dashboard.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  const [value, setValue] = React.useState(0);
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
        setcustomerdata(response.data);
        console.log(customerdata);
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
        setemployeedata(response.data.employeesdata);
        console.log(response.data.employeesdata);
      } catch (error) {
        console.error("Error fetching Employees Data:", error);
      }
    }
  };

  React.useEffect(() => {
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
