import { useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import CoverLayout from "layouts/CoverLayout";

// Images
import logincover from "assets/images/logincover.jpg";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { handleSignup } from "../../redux/actions/LoginActions";
//Utilities
import * as Utilities from "../../helper/Utilities";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var errorObj = {
  isError: false,
  errorMessage: "",
};
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
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
  const userRegister = () => {
    try {
      if (Utilities.stringIsEmpty(state.name)) {
        errorObj = {
          isError: true,
          errorMessage: "Enter Name",
        };
        errorToast(errorObj);
        return;
      }
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

      dispatch(handleSignup(state.name, state.email, state.password, navigate));
    } catch (e) {
      console.log("Exception e", e.message);
    }
  };


  return (
    <CoverLayout image={logincover}>
      <Card>
        <ToastContainer />
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="light"
          mx={2}
          mt={-10}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                id="name"
                value={state.name}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
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
                variant="standard"
                id="password"
                value={state.password}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="light" onClick={() => userRegister()} fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
