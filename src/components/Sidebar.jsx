import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/tube.png";
import { FaTimes } from "react-icons/fa";
import { links } from "../utils/constants";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { useSidebarContext } from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useSidebarContext();
  const { token, logOut } = useAuthContext();
  const navigate = useNavigate();
  const isLoggedIn = !!token;
  return (
    <Wrapper>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"} `}
      >
        <div className="sidebar-header">
          <img src={logo} alt="logo-img" className="logo" />
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {isLoggedIn ? (
            <li>
              <Link to="/products" onClick={closeSidebar}>
                Products
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={closeSidebar}>
                Login
              </Link>
            </li>
          )}
        </ul>
        {isLoggedIn ? (
          <button
            type="button"
            className="logout sidebar-btn"
            onClick={() => {
              logOut();
              closeSidebar();
              navigate("/");
            }}
          >
            <FaUserMinus />
          </button>
        ) : (
          <Link
            to="/login"
            className="login sidebar-btn"
            onClick={closeSidebar}
          >
            <FaUser />
          </Link>
        )}
      </aside>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: #7100e2;
    transition: var(--transition);
    cursor: pointer;
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: #f1dec9;
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: #ffffff;
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    color: #7f1ae5;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #040303;
    transition: all 0.5s linear;
    transform: translateY(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .sidebar-btn {
    background: transparent;
    border-color: transparent;
    color: #ffffff;
  }
  .login {
    font-size: 1.5rem;
  }
  .logout {
    font-size: 1.7rem;
  }
  .sidebar-btn:hover {
    color: #7f1ae5;
    cursor: pointer;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;
export default Sidebar;
