import styled from "styled-components";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbuttons = () => {
  const { logOut } = useAuthContext();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  return (
    <Wrapper className="nav-btn-wrapper">
      {isLoggedIn ? (
        <button
          type="button"
          className="user_btn nav-btn"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          <FaUserMinus />
        </button>
      ) : (
        <Link to="/login" className="login_btn nav-btn">
          <FaUser />
        </Link>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  align-items: center;
  width: 120px;

  .nav-btn {
    letter-spacing: var(--spacing);
    color: #ffffff;
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    justify-content: end;
  }
  .login_btn {
    font-size: 1.3rem;
  }
  .user_btn {
    font-size: 1.5rem;
  }
  .nav-btn:hover {
    color: #7f1ae5;
    cursor: pointer;
  }
`;
export default Navbuttons;
