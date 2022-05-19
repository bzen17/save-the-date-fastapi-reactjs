import React from "react";
import ReactLoading from "react-loading";

const Loader = (props) => {
  return (
    <div className="loader-overlay">
      <ReactLoading type="bars" color="#0D21A1" className="loader" />
    </div>
  );
};

export default Loader;
