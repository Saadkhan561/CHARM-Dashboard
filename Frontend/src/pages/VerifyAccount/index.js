import React, { useState, useEffect } from "react";
import { verifyAccount } from "../../redux/actions/LoginActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const VerifyAccount = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verify_account_response = useSelector(
    (state) => state.LoginReducer.verify_account_response
  );
  let params = new URL(document.location).searchParams;
  const [token, setToken] = useState(params.get("token"));

  useEffect(() => {
    dispatch(verifyAccount(token));
  }, []);
  if (verify_account_response) {
    if(verify_account_response?.response?.status === 403){
     navigate("/authentication/sign-up")
    }
    else{
      navigate("/authentication/sign-in")
    }
   
  }

  return <div></div>;
};

export default VerifyAccount;
