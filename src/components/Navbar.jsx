import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/tube.png";
import { FaBars } from "react-icons/fa";
import { links } from "../utils/constants";
import Navbuttons from "./Navbuttons";
import { useSidebarContext } from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="logo-img" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? "active" : "pending"
                  }
                >
                  {text}
                </NavLink>
              </li>
            );
          })}
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : "pending")}
              >
                Products
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "pending")}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
        <Navbuttons />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: #7100e2;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-toggle:hover {
    color: #f1dec9;
  }
  .nav-links {
    display: none;
  }
  .nav-btn-wrapper {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 1rem;
      }
      a {
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          color: #7f1ae5;
        }
      }
    }
    .active {
      color: #7100e2;
      border-bottom: 2px solid #7100e2;
    }
    .pending {
      color: #ffffff;
    }
    .nav-btn-wrapper {
      display: grid;
    }
  }
`;
export default Navbar;
