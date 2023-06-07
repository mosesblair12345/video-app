import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return children;
};
export default PrivateRoute;
