import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import ForgetPassword from "pages/ForgetPass";
import ResetPassword from "pages/ResetPass";
import VerifyAccount from "pages/VerifyAccount";



const otherRoutes = [
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    exact: true,
  },
  {
    // type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    exact: true,
  },

  {
    // type: "collapse",
    name: "Forget Password",
    key: "forget-password",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/forget-password",
    component: <ForgetPassword />,
    exact: true,
  },
  {
    // type: "collapse",
    name: "Reset Password",
    key: "reset-password",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/reset-password/",
    component: <ResetPassword />,
    exact: false,
  },

  {
    // type: "collapse",
    name: "Verify Account",
    key: "verify-account",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/verify-account/",
    component: <VerifyAccount />,
    exact: false,
  },
];
export default otherRoutes;
