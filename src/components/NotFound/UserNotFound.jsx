import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function UserNotFound() {
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
      <p>User Not Found</p>
      <Link to="/">
        <Button variant="contained">Back</Button>
      </Link>
    </section>
  );
}
