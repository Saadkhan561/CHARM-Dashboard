import * as ActionTypes from "../actions/ActionTypes";

const INITIAL_STATE = {
  user: {},
  forget_password_response: {
    status: "",
    message: "",
  },
  verify_account_response: {
    message: "",
  },
  reset_password_response: {
    status: "",
    message: "",
  },
};
const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.SIGNUP:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.VERIFY_ACCOUNT_RESPONSE:
      return {
        ...state,
        verify_account_response: {
          ...state.verify_account_response,
          ...action.payload,
        },
      };
    case ActionTypes.LOGOUT:
      return INITIAL_STATE;

    case ActionTypes.FORGET_PASSWORD_RESPOSE:
      return {
        ...state,
        forget_password_response: {
          ...state.forget_password_response,
          ...action.payload,
        },
      };
    case ActionTypes.RESET_PASSWORD_RESPOSE:
      return {
        ...state,
        reset_password_response: {
          ...state.reset_password_response,
          ...action.payload,
        },
      };
    case ActionTypes.CLEAR_FORGET_PASSWORD_RESPOSE:
      return {
        ...state,
        forget_password_response: {
          status: "",
          message: "",
        },
      };
    case ActionTypes.CLEAR_RESET_PASSWORD_RESPOSE:
      return {
        ...state,
        reset_password_response: {
          status: "",
          message: "",
        },
      };
    default:
      return state;
  }
};

export default LoginReducer;
