import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "redux/actions/LogoutAction";
import SignIn from "pages/SignIn";

const Logout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(handleLogout(navigate));
    return(<div></div>)
}

export default Logout;

