import React from "react";
// @ts-ignore
import cssStr from "../styles2.css";
// import cssStr from "../styles.css";

// declare module "*.css" {
//     const content: string;
//     export default content;
// }

const Styles = () => {
  return <style>{cssStr}</style>;
};

export default Styles;
