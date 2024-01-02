import React from "react";
import { Toaster} from "react-hot-toast";

const MyToaster = (props) => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: "",
        style: {
          padding: "16px",
          fontSize: "1.8rem",
          background: "black",
          color : "white",
        },
      }}
    />
  );
};

export default MyToaster;
