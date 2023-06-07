import styled from "styled-components";
import login from "../assets/login.png";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useEffect } from "react";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {
    setRegister,
    login: { login_username, login_password },
    setLoginValues,
    login_auth,
    login_error_message,
    login_loading,
    token,
  } = useAuthContext();

  const isLoggedIn = !!token;
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn]);

  if (login_loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <h3 className="heading">Login</h3>
      <section className="login-container">
        <div>
          <img src={login} alt="login-img" className="login-img" />
        </div>
        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            {login_error_message && (
              <p className="error-paragraph">Wrong username or password</p>
            )}
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              placeholder="username"
              className="login-input"
              id="username"
              name="login_username"
              value={login_username}
              onChange={setLoginValues}
              required
            />
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type={visible ? "text" : "password"}
                placeholder="password"
                className="login-input"
                id="password"
                name="login_password"
                value={login_password}
                onChange={setLoginValues}
                required
              />
              <div onClick={() => setVisible(!visible)}>
                {visible ? (
                  <FaEye className="eye" />
                ) : (
                  <FaEyeSlash className="eye" />
                )}
              </div>
            </div>
            <button className="btn" type="submit" onClick={login_auth}>
              <FaUser />
              <span className="submit-span">LOGIN</span>
            </button>
          </form>
          <a href="mailto:info@onfonmedia.com" target="_blank" className="link">
            Lost Password ?{" "}
          </a>
          <button onClick={setRegister} className="login-btn">
            Don't have an account?{" "}
            <span className="login-span">Register here.</span>
          </button>
        </div>
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 85vw;
  margin: 0 auto;
  text-align: center;
  min-height: calc(100vh - 10rem);
  padding: 1rem 0 4rem;
  .login-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: #2c3333;
    margin: 0 auto;
    padding: 1rem;
    border-radius: var(--radius);
  }
  .form-container {
    text-align: left;
  }
  .heading {
    margin-bottom: 2rem;
  }
  .login-img {
    width: 70%;
    width: 420px;
    height: 420px;
  }
  .login-input {
    display: block;
    margin: 0.5rem 0;
    padding: 1rem;
    border: none;
    font-size: 0.9rem;
    border-radius: var(--radius);
    width: 95%;
    outline: none !important;
  }
  .login-input::placeholder {
    text-transform: capitalize;
  }
  .btn {
    margin: 0.5rem 0;
  }
  .login-btn {
    margin: 0.5rem 0;
    background: transparent;
    border: transparent;
    color: #ffffff;
  }
  .login-btn:hover {
    cursor: pointer;
  }
  .submit-span {
    padding-left: 10px;
  }
  .login-span {
    text-decoration: underline;
  }
  .link {
    text-decoration: none;
    color: #ffffff;
    cursor: pointer;
    display: block;
  }
  .error-paragraph {
    color: red;
    margin-top: 15px;
  }
  .input-container {
    display: flex;
    align-items: center;
    position: relative;
  }
  .eye {
    color: #000;
    position: absolute;
    top: 38%;
    right: 8%;
    font-size: 1.2rem;
  }
  .eye:hover {
    cursor: pointer;
  }

  @media (max-width: 992px) {
    .login-container {
      display: block;
    }
  }
  @media (max-width: 902px) {
    .login-img {
      width: 350px;
      height: 350px;
    }
  }
  @media (max-width: 690px) {
    .login-img {
      width: 270px;
      height: 270px;
    }
  }
  @media (max-width: 580px) {
    .login-img {
      width: 220px;
      height: 220px;
    }
    .login-input {
      font-size: 0.8rem;
      padding: 0.8rem;
    }
    .eye {
      top: 37%;
      font-size: 1rem;
    }
  }
  @media (max-width: 430px) {
    .login-img {
      width: 150px;
      height: 150px;
    }
    .login-input {
      font-size: 0.7rem;
      padding: 0.7rem;
    }
    .btn {
      font-size: 0.8rem;
    }
  }
`;
export default Login;
