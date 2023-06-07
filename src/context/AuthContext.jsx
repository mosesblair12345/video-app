import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/AuthReducer";
import axios from "axios";
import {
  SET_LOGIN_PAGE,
  SET_REGISTER_PAGE,
  SET_SIGNUP_VALUES,
  SET_LOGIN_VALUES,
  CHECK_SIGNUP_VALUES,
  GET_LOGIN_BEGIN,
  GET_LOGIN_ERROR,
  GET_LOGIN_SUCESS,
  GET_LOGOUT,
} from "../actions";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    loginForm: true,
    login_loading: false,
    first_name: "moses",
    _email: "m@g.com",
    token: "i",
    signup: {
      firstName: "",
      lastName: "",
      signup_username: "",
      email: "",
      registerPassword: "",
      confirmPassword: "",
    },
    login: {
      login_username: "",
      login_password: "",
    },
    signup_error: {
      firstNameError: "",
      lastNameError: "",
      signuUserNameError: "",
      emailError: "",
      passwordRegisterError: "",
      confirmPasswordError: "",
    },
    login_error_message: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  Cookies.set("first_name", state.first_name, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("_email", state._email, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("token", state.token, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });

  const setRegister = () => {
    dispatch({ type: SET_REGISTER_PAGE });
  };

  const setLogin = () => {
    dispatch({ type: SET_LOGIN_PAGE });
  };

  const setSignupValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: SET_SIGNUP_VALUES, payload: { name, value } });
  };

  const setLoginValues = (e) => {
    const names = e.target.name;
    const values = e.target.value;
    dispatch({ type: SET_LOGIN_VALUES, payload: { names, values } });
  };

  const checkSignupValues = () => {
    dispatch({ type: CHECK_SIGNUP_VALUES });
  };

  let data = JSON.stringify({
    username: state.login.login_username,
    password: state.login.login_password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://tube.co.ke/wp-json/jwt-auth/v1/token",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const login_auth = () => {
    dispatch({ type: GET_LOGIN_BEGIN });
    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_LOGIN_SUCESS,
          payload: {
            token: response.data.token,
            first_name: response.data.first_name,
            _email: response.data.user_email,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: GET_LOGIN_ERROR });
      });
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("first_name");
    Cookies.remove("_email");
    dispatch({ type: GET_LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setRegister,
        setLogin,
        setSignupValues,
        setLoginValues,
        checkSignupValues,
        login_auth,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
