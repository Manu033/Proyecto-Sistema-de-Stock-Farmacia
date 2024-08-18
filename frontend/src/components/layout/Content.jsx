import React from "react";
import Header from "./Header";

function Content({ children }) {
  return (
    <>
      <div className="max-h-screen overflow-hidden">
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
}

export default Content;
