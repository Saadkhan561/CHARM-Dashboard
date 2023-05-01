import { Button } from "@mui/material";
import React from "react";
import "./ErrorButton.css";

import { Link, useNavigate } from "react-router-dom";

function ErrorButton(props) {
  return (
    // <MDButton
    // className="buttonerror"
    //     variant="gradient"
    //     color="dark"

    //     onClick={() => handleViewButton()}
    //   >
    //     View
    //   </MDButton>
    <>
      {props.button == "dashboard" ? (
        <Link to="/dashboard">
          <button class="buttonerror pulse">Dashboard</button>
        </Link>
      ) : (
        <Link to="/authentication/sign-in">
          <button class="buttonerror pulse">Sign In</button>
        </Link>
      )}
    </>
  );
}

export default ErrorButton;
