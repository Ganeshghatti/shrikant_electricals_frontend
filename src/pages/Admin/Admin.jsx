import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./Admin.scss";
import axios from "axios";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const buttonstyle = {
    backgroundColor: "#333333",
    color: "white",
  };

  const handleSubmit = () => {
    if (password == "admin") {
      window.location.href = `/dashboard`;
    } else {
      seterror("Wrong password");
    }
  };
  return (
    <section id="admin">
      <h1>Enter admin password</h1>
      <input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p style={{fontWeight:"900",color:"red"}}>{error}</p>
      <Button
        variant="contained"
        style={buttonstyle}
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </section>
  );
}
