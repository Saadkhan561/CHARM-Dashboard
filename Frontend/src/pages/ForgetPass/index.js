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
import MDSnackbar from "components/MDSnackbar";

import BasicLayout from "layouts/BasicLayout";

import login from "assets/images/login.jpg";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleForgetPassword,
  clearForgetPasswordRespone,
} from "../../redux/actions/LoginActions";

//Utilities
import * as Utilities from "../../helper/Utilities";

var errorObj = {
  isError: false,
  errorMessage: "",
};

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgetPassword() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    error: false,
    errorMessage: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const forget_password_response = useSelector(
    (state) => state.LoginReducer.forget_password_response
  );
  const [warningSB, setwarningSB] = useState(false);
  const openwarningSB = () => setwarningSB(true);
  const closewarningSB = () => setwarningSB(false);

  const handleChange = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
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
  //success Toast
  const successToast = (obj) => {
    try {
      if (obj.isError) {
        toast.success(obj.errorMessage, {
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
  //Dispatching forget password action
  const forgetPassword = () => {
    try {
      if (Utilities.stringIsEmpty(state.email)) {
        errorObj = {
          isError: true,
          errorMessage: "Enter Email",
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

      dispatch(handleForgetPassword(state.email));
    } catch (e) {
      console.log("Exception e", e.message);
    }
  };

  // redirection
  if (forget_password_response) {
    if (forget_password_response.status === "success") {
      setSuccessAlert(true);
      errorObj = {
        isError: true,
        errorMessage: forget_password_response.message,
      };
      successToast(errorObj);
      dispatch(clearForgetPasswordRespone());
      setTimeout(() => {
        navigate("/authentication/sign-in");
      }, 2000);
    } else if (forget_password_response.status === "fail") {
      errorObj = {
        isError: true,
        errorMessage: forget_password_response.message,
      };
      errorToast(errorObj);
      dispatch(clearForgetPasswordRespone());
    }
  }
  return (
    <BasicLayout image={login}>
      <Card>
        <ToastContainer />
        {successAlert ? (
          <MDSnackbar
            color="success"
            icon="check"
            title="SUCCESS"
            content={errorObj.errorMessage}
            dateTime=""
            open={warningSB}
            onClose={closewarningSB}
            close={closewarningSB}
            bgWhite
          />
        ) : (
          <MDSnackbar
            color="warning"
            icon="warning"
            title="WARNING"
            content={errorObj.errorMessage}
            dateTime=""
            open={warningSB}
            onClose={closewarningSB}
            close={closewarningSB}
            bgWhite
          />
        )}

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
            Forgot password ?
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your user account's email address and we will send you a password reset link.{" "}
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

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="light" onClick={() => forgetPassword()} fullWidth>
                Reset Password
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Return to{" "}
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
    </BasicLayout>
  );
}

export default ForgetPassword;
