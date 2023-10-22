import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function NotFound() {
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
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </section>
  );
}

export default NotFound;
