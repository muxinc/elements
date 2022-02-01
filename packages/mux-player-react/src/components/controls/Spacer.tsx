import React from "react";

const Spacer = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        height: "100%",
        backgroundColor: "var(--media-control-background, rgba(20,20,30, 0.7))",
      }}
    ></div>
  );
};

export default Spacer;
