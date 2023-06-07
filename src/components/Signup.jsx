import styled from "styled-components";
import register from "../assets/login.png";
import { FaUserPlus, FaEyeSlash, FaEye } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    setLogin,
    signup: {
      firstName,
      lastName,
      signup_username,
      email,
      registerPassword,
      confirmPassword,
    },
    setSignupValues,
    checkSignupValues,
    signup_error: {
      firstNameError,
      lastNameError,
      signuUserNameError,
      emailError,
      passwordRegisterError,
      confirmPasswordError,
    },
  } = useAuthContext();
  return (
    <Wrapper>
      <h3 className="heading">Register</h3>
      <section className="register-container">
        <div className="img-container">
          <img src={register} alt="register-img" className="register-img" />
        </div>
        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="name-container">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="first name"
                  className="register-input"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={setSignupValues}
                />
                <p className="error-paragraph">{firstNameError}</p>
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="last name"
                  className="register-input"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={setSignupValues}
                />
                <p className="error-paragraph">{lastNameError}</p>
              </div>
            </div>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              placeholder="username"
              className="register-input"
              id="userName"
              name="signup_username"
              value={signup_username}
              onChange={setSignupValues}
            />
            <p className="error-paragraph">{signuUserNameError}</p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              className="register-input"
              id="email"
              name="email"
              value={email}
              onChange={setSignupValues}
            />
            <p className="error-paragraph">{emailError}</p>
            <div className="password-container">
              <div>
                <label htmlFor="registerPassword">Password</label>
                <div className="input-container">
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="password"
                    className="register-input"
                    id="registerPassword"
                    name="registerPassword"
                    value={registerPassword}
                    onChange={setSignupValues}
                  />
                  <div onClick={() => setVisible(!visible)}>
                    {visible ? (
                      <FaEye className="eye" />
                    ) : (
                      <FaEyeSlash className="eye" />
                    )}
                  </div>
                </div>
                <p className="error-paragraph">{passwordRegisterError}</p>
              </div>
              <div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-container">
                  <input
                    type={confirmVisible ? "text" : "password"}
                    placeholder="confirm password"
                    className="register-input"
                    id="confirm-password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={setSignupValues}
                  />
                  <div onClick={() => setConfirmVisible(!confirmVisible)}>
                    {confirmVisible ? (
                      <FaEye className="eye" />
                    ) : (
                      <FaEyeSlash className="eye" />
                    )}
                  </div>
                </div>
                <p className="error-paragraph">{confirmPasswordError}</p>
              </div>
            </div>
            <button className="btn" type="submit" onClick={checkSignupValues}>
              <FaUserPlus />
              <span className="submit-span">Register</span>
            </button>
          </form>
          <button onClick={setLogin} className="signup-button">
            Already have an account?{" "}
            <span className="signup-span">Login here.</span>
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
  .register-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: #2c3333;
    padding: 1rem;
    margin: 0 auto;
    align-items: center;
    border-radius: var(--radius);
  }
  .heading {
    margin-bottom: 2rem;
  }
  .img-container {
    text-align: center;
    align-items: center;
  }
  .form-container {
    text-align: left;
  }
  .register-img {
    width: 70%;
    width: 420px;
    height: 420px;
  }
  .register-input {
    display: block;
    margin: 0.5rem 0;
    padding: 1rem;
    border: none;
    font-size: 0.9rem;
    border-radius: var(--radius);
    width: 95%;
    outline: none !important;
  }
  .register-input::placeholder {
    text-transform: capitalize;
  }
  .name-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  .password-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  .signup-button {
    margin: 0.5rem 0;
    background: transparent;
    border: transparent;
    color: #ffffff;
  }
  .signup-button:hover {
    cursor: pointer;
  }
  .submit-span {
    padding-left: 10px;
  }
  .signup-span {
    text-decoration: underline;
  }
  .btn {
    margin: 0.5rem 0;
  }
  .error-paragraph {
    color: red;
    text-transform: capitalize;
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
    .register-container {
      display: block;
    }
  }
  @media (max-width: 902px) {
    .register-img {
      width: 350px;
      height: 350px;
    }
  }
  @media (max-width: 690px) {
    .register-img {
      width: 270px;
      height: 270px;
    }
  }
  @media (max-width: 580px) {
    .register-img {
      width: 220px;
      height: 220px;
    }
    .name-container {
      display: block;
    }
    .password-container {
      display: block;
    }
    .register-input {
      font-size: 0.8rem;
      padding: 0.8rem;
    }
    .eye {
      top: 37%;
      font-size: 1rem;
    }
  }
  @media (max-width: 430px) {
    .register-img {
      width: 150px;
      height: 150px;
    }
    .register-input {
      font-size: 0.7rem;
      padding: 0.7rem;
    }
    .btn {
      font-size: 0.8rem;
    }
  }
`;
export default Signup;
