import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner
        animation="border"
        role="status"
        style={{
          display: "block",
          width: "80px",
          height: "80px",
          margin: "auto",
        }}
      />
    </>
  );
};

export default Loader;
