import Login from "./Login";
import Signup from "./Signup";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { loginForm } = useAuthContext();
  return <>{loginForm ? <Login /> : <Signup />}</>;
};

export default Auth;
