import React from "react";
import { Spin } from "antd";

const Spinner = (props) => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        marginTop: props.marginTop ? props.marginTop : 200,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
