import React from 'react'

export default function Formsuccessful() {
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
    <h1 style={{color:"green"}}>Sucessfully Submitted!!</h1>
    <p>Our Team will contact you as soon as possible</p>
    <Link to="/">
      <Button variant="contained">Home</Button>
    </Link>
  </section>
  )
}
