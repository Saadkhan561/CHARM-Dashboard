

import LoginReducer from './LoginReducer';
import CarReducer from "./CarReducer"
import LoaderReducer from "./LoaderReducer"
import { combineReducers } from 'redux';

export default combineReducers({
    LoginReducer: LoginReducer,
    CarReducer:CarReducer,
    LoaderReducer :LoaderReducer 
});