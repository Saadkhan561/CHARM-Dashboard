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

// Images

import login from "assets/images/login.jpg";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  handleResetPassword,
  clearResetPasswordRespone,
} from "../../redux/actions/LoginActions";

//Utilities
import * as Utilities from "../../helper/Utilities";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var errorObj = {
  isError: false,
  errorMessage: "",
};
function ResetPassword(props) {
  let params = new URL(document.location).searchParams;

  // const query = new URLSearchParams(props.location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState(params.get("token"));
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);

  const reset_password_response = useSelector(
    (state) => state.LoginReducer.reset_password_response
  );

  const [warningSB, setwarningSB] = useState(false);
  const openwarningSB = () => setwarningSB(true);
  const closewarningSB = () => setwarningSB(false);
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
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //Dispatching reset password action
  const resetPassword = () => {
    if (Utilities.stringIsEmpty(state.password)) {
      errorObj = {
        isError: true,
        errorMessage: "Enter Password",
      };
      errorToast(errorObj);
      return;
    }
    if (Utilities.stringIsEmpty(state.confirmPassword)) {
      errorObj = {
        isError: true,
        errorMessage: "Enter Confirm Password",
      };
      errorToast(errorObj);
      return;
    }
    if (state.password === state.confirmPassword) {
      dispatch(handleResetPassword(token, state.password));
    } else {
      errorObj = {
        isError: true,
        errorMessage: "Password do not match",
      };
      errorToast(errorObj);
      return;
    }
  };

  // redirection
  if (reset_password_response) {
    if (reset_password_response.status === "success") {
      setSuccessAlert(true);
      errorObj = {
        isError: true,
        errorMessage: reset_password_response.message,
      };
      successToast(errorObj);

      dispatch(clearResetPasswordRespone());
      setTimeout(() => {
        navigate("/authentication/sign-in");
      }, 2000);
    } else if (reset_password_response.status === "fail") {
      errorObj = {
        isError: true,
        errorMessage: reset_password_response.message,
      };
      errorToast(errorObj);
      dispatch(clearResetPasswordRespone());
      setTimeout(() => {
        navigate("/authentication/forget-password");
      }, 2000);
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
            Reset Password
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
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

            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                id="confirmPassword"
                value={state.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="light" onClick={() => resetPassword()} fullWidth>
                Reset Password
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ResetPassword;
