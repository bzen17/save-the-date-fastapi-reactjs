import React from "react";
import ReactLoading from "react-loading";

const Loader = (props) => {
  return (
    <div className="loader-overlay">
      <ReactLoading type="bars" color="#fff" className="loader" />
    </div>
  );
};

export default Loader;
