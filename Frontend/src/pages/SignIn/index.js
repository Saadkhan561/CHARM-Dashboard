import * as React from "react";

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import BasicLayout from "layouts/BasicLayout";

// Images
import login from "assets/images/login.jpg";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleLogin} from "../../redux/actions/LoginActions";

//Utilities
import * as Utilities from "../../helper/Utilities";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var errorObj = {
  isError: false,
  errorMessage: "",
};
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: false,
    errorMessage: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //Error Toast
  const errorToast = (obj) => {
    try {
      if (obj.isError) {
        toast.error(obj.errorMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
        });
        setTimeout(() => {
          errorObj = {
            isError: false,
            errorMessage: "",
          };
        }, 2000);
      }
    } catch (e) {
      console.log("Exception errorToast", e);
    }
  };

  //Dispatching login action
  const userLogin = () => {
    try {
      if (Utilities.stringIsEmpty(state.email)) {
        errorObj = {
          isError: true,
          errorMessage: "Enter Email",
        };

        errorToast(errorObj);
        return;
      }
      if (Utilities.stringIsEmpty(state.password)) {
        errorObj = {
          isError: true,
          errorMessage: "Enter Password",
        };
        errorToast(errorObj);
        return;
      }

      if (Utilities.emailRegex.test(state.email) == false) {
        errorObj = {
          isError: true,
          errorMessage: "Enter Valid Email",
        };
        errorToast(errorObj);
        return;
      }


      dispatch(handleLogin(state.email, state.password, navigate));
    } catch (e) {
      console.log("Exception e", e.message);
    }
  };
  return (
    <BasicLayout image={login}>
      <Card>
        <ToastContainer />
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="light"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                id="email"
                value={state.email}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                id="password"
                value={state.password}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="light" onClick={() => userLogin()} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox textAlign="center">
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/authentication/forget-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Forgot Password?
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
