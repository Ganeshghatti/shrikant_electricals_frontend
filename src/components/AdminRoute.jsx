import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AdminRoute({ children }) {
  const employee = JSON.parse(localStorage.getItem("employee"));
  const [isadmin, setisadmin] = useState(false);

  useEffect(() => {
    const admincheck = async () => {
      try {
        console.log(employee);
        const response = await axios.post(
          "http://localhost:5000/checkadmin",
          { employee },
          {
            headers: {
              Authorization: `Bearer ${employee.token}`,
            },
          }
        );
        console.log(response.data.isadmin);
        const isAdmin = response.data.isadmin;
        setisadmin(isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error.message);
      }
    };

    admincheck();
  }, []);

  if (isadmin === null) {
    return null;
  }

    if (!isadmin) {
      return (
        <section
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>403 - Access Forbidden</h1>
        </section>
      );
    }
    return children;
}
