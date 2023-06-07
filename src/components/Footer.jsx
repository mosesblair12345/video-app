import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  // https://twitter.com/onfonmedial -twitter
  //info@onfonmedia.com - gmail
  // https://www.facebook.com/onfonmedial - facebook
  return (
    <Wrapper>
      <div className="link-container">
        <a href="mailto:info@onfonmedia.com" target="_blank">
          <MdEmail />
        </a>
        <a href="https://www.facebook.com/onfonmedial" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://twitter.com/onfonmedial" target="_blank">
          <FaTwitter />
        </a>
      </div>
      <div className="info-container">
        <h5>
          &copy;
          {new Date().getFullYear()}
          <span> Onfon Media </span>
        </h5>
        <h5>All rights reserved</h5>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.footer`
  height: 6rem;
  background: var(--clr-black);
  text-align: center;
  span {
    color: #7100e2;
  }
  a {
    color: #ffffff;
    font-size: 1.3rem;
    padding-right: 25px;
  }
  a:hover {
    color: #7f1ae5;
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  .link-container {
    display: block;
    padding-top: 10px;
    padding-bottom: 8px;
  }
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;
export default Footer;
