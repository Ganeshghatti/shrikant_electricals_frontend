import Spinner from "react-bootstrap/Spinner";

function Spinnerf() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" />
    </div>
  );
}

export default Spinnerf;
