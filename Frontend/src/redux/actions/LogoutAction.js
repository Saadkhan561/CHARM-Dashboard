import axios from "axios";
import * as ActionTypes from "./ActionTypes";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: `http://localhost:5000`,
});

export const handleLogout = (navigate) => {
    console.log("logout outside")
  return (dispatch) => {
    
        console.log("logout")
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          navigate("/authentication/sign-in");
          return dispatch({
            type: ActionTypes.LOGOUT
          })
};

// export const handleSignup = (name, email, password,navigate) => {
//   return (dispatch) => {
//     let data = { username: name, email: email, password: password };
//     return api
//       .post("/register", data)
//       .then((res) => {
//         console.log("resss",res)
//         if (res.data.status === "success") {
         
//           setTimeout(() => {
//            navigate( "/authentication/sign-in");
//           }, 2000);
//           return dispatch({
//             type: ActionTypes.SIGNUP,
//             payload: res.data.message,
//           });
//         } else {
//           return dispatch({
//             type: ActionTypes.SIGNUP,
//             payload: res.data.message,
//           });
//         }
//       })
//       .catch((e) => {
//       })
//   };
// };
// export const verifyAccount = (token) => {
//   return (dispatch) => {
//     return api
//       .post(`/verify-account/?token=${token}`)
//       .then((res) => {
//         return dispatch(verifyAccountRespone(res.data));
//       })
//       .catch((error) => {
//         return dispatch(verifyAccountRespone(error));
//       });
//   };
// };
// export const verifyAccountRespone = (response) => {
//   return {
//     type: ActionTypes.VERIFY_ACCOUNT_RESPONSE,
//     payload: response,
//   };
// };

// export const handleForgetPassword = (email) => {
//   let data = {
//     email: email,
//   };
//   return (dispatch) => {
//     return api
//       .post("/forget-password", JSON.stringify(data))
//       .then((res) => {
//         return dispatch(forgetPasswordRespone(res.data));
//       })
//       .catch((error) => {});
//   };
// };
// export const forgetPasswordRespone = (response) => {
//   // In response we are getting message and status from an api
//   return {
//     type: ActionTypes.FORGET_PASSWORD_RESPOSE,
//     payload: response,
//   };
// };

// export const handleResetPassword = (token, password) => {
//   let data = {
//     password: password,
//   };
//   return (dispatch) => {
//     return api
//       .post(`/reset-password/?token=${token}`, JSON.stringify(data))
//       .then((res) => {
//         return dispatch(resetPasswordRespone(res.data));
//       })
//       .catch((error) => {});
//   };
// };
// export const resetPasswordRespone = (response) => {
//   return {
//     type: ActionTypes.RESET_PASSWORD_RESPOSE,
//     payload: response,
//   };
// };

// export const clearResetPasswordRespone = () => {
//   return {
//     type: ActionTypes.CLEAR_RESET_PASSWORD_RESPOSE,
//   };
// };

// export const clearForgetPasswordRespone = () => {
//   return {
//     type: ActionTypes.CLEAR_FORGET_PASSWORD_RESPOSE,
//   };
// };
}