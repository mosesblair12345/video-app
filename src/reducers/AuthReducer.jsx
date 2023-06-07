import {
  SET_LOGIN_PAGE,
  SET_REGISTER_PAGE,
  SET_SIGNUP_VALUES,
  SET_LOGIN_VALUES,
  CHECK_SIGNUP_VALUES,
  GET_LOGIN_BEGIN,
  GET_LOGIN_SUCESS,
  GET_LOGIN_ERROR,
  GET_LOGOUT,
} from "../actions";
import Cookies from "js-cookie";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN_PAGE:
      return { ...state, loginForm: true };
    case SET_REGISTER_PAGE:
      return { ...state, loginForm: false };
    case SET_SIGNUP_VALUES:
      const { name, value } = action.payload;
      return { ...state, signup: { ...state.signup, [name]: value } };
    case SET_LOGIN_VALUES:
      const { names, values } = action.payload;
      return { ...state, login: { ...state.login, [names]: values } };
    case CHECK_SIGNUP_VALUES:
      const {
        firstName,
        lastName,
        signup_username,
        email,
        registerPassword,
        confirmPassword,
      } = state.signup;
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /(?=.*\d)/;
      if (firstName === "") {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "Please fill in first name",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError: "",
            confirmPasswordError: "",
          },
        };
      }
      if (lastName === "") {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "Please fill in last name",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError: "",
            confirmPasswordError: "",
          },
        };
      }
      if (signup_username === "") {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "Please fill in username",
            emailError: "",
            passwordRegisterError: "",
            confirmPasswordError: "",
          },
        };
      }
      if (email === "") {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "Please fill in email",
            passwordRegisterError: "",
            confirmPasswordError: "",
          },
        };
      }
      if (!regex.test(email.toLowerCase())) {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "This is not a valid email!",
            passwordRegisterError: "",
            confirmPasswordError: "",
          },
        };
      }
      if (registerPassword === "") {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError: "Please fill in password",
            confirmPasswordError: "",
          },
        };
      }
      if (registerPassword.length <= 8) {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError:
              "Password must be greater than 8 characters!",
            confirmPasswordError: "",
          },
        };
      }
      if (!passwordRegex.test(registerPassword)) {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError: "Password must contain atleast one number!",
            confirmPasswordError: "",
          },
        };
      }
      if (confirmPassword !== registerPassword) {
        return {
          ...state,
          signup_error: {
            ...state.signup_error,
            firstNameError: "",
            lastNameError: "",
            signuUserNameError: "",
            emailError: "",
            passwordRegisterError: "",
            confirmPasswordError: "Password does not match",
          },
        };
      }
      return {
        ...state,
        signup_error: {
          firstNameError: "",
          lastNameError: "",
          signuUserNameError: "",
          emailError: "",
          passwordRegisterError: "",
          confirmPasswordError: "",
        },
      };
    case GET_LOGIN_BEGIN:
      return { ...state, login_loading: true };
    case GET_LOGIN_SUCESS:
      const { token, first_name, _email } = action.payload;

      Cookies.set("first_name", first_name, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("_email", _email, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      return {
        ...state,
        login_loading: false,
        sucess_login: "true",
        login_error_message: false,
        login: {
          login_username: "",
          login_password: "",
        },
        token: token,
        first_name: first_name,
        _email: _email,
      };
    case GET_LOGIN_ERROR:
      return {
        ...state,
        login_loading: false,
        login_error_message: true,
        sucess_login: "false",
      };
    case GET_LOGOUT:
      return { ...state, token: "", first_name: "", _email: "" };
    default:
      throw new Error(`No matching "${action.type}" - action type`);
  }
};
export default AuthReducer;
