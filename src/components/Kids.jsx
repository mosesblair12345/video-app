import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";
import { useKidsContext } from "../context/KidsContext";
import Loading from "./Loading";
import Error from "./Error";
import { useAuthContext } from "../context/AuthContext";

const Kids = () => {
  const { kids, kids_error: error, kids_loading: loading } = useKidsContext();
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper>
      <h3>Kids</h3>
      <div className="kids-container">
        {kids.map(({ id, url, name }) => {
          return (
            <div key={id} className="div-container">
              <div className="image-container">
                <Link to={isLoggedIn ? "/products" : "/login"}>
                  <LazyLoadImage
                    src={url}
                    alt={name}
                    className="kids-img"
                    effect="blur"
                    placeholderSrc={blur}
                  />
                </Link>
                <Link to={isLoggedIn ? "/products" : "/login"} className="link">
                  <FaPlay />
                </Link>
              </div>
              <p className="kids-paragraph">
                <strong>{name}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto 4rem;
  width: 85vw;
  .kids-container {
    display: grid;
    margin-left: 0;
    margin-top: 1.5rem;
  }
  .kids-img {
    width: 100%;
    display: block;
    width: 320px;
    height: 160px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .div-container {
    transition: transform 0.3s;
    text-align: left;
  }
  .div-container:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .image-container {
    position: relative;
  }
  .link {
    position: absolute;
    top: 45%;
    left: 35%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: #7100e2;
    }
  }
  .image-container:hover img {
    opacity: 0.5;
  }
  .image-container:hover .link {
    opacity: 1;
  }
  .kids-paragraph {
    color: #ffffff;
    text-transform: capitalize;
    text-align: left;
  }
  @media (max-width: 1020px) {
    .link {
      left: 34%;
    }
    .kids-img {
      width: 260px;
      height: 120px;
    }
  }
  @media (max-width: 820px) {
    .link {
      left: 34%;
      width: 1.8rem;
      height: 1.8rem;
      svg {
        font-size: 0.8rem;
      }
    }
    .kids-img {
      width: 230px;
      height: 100px;
    }
  }
  @media (max-width: 680px) {
    .link {
      left: 30%;
    }
    .kids-img {
      width: 160px;
      height: 90px;
    }
  }
  @media (max-width: 520px) {
    .link {
      left: 30%;
    }
    .kids-img {
      width: 130px;
      height: 85px;
    }
  }
  @media (max-width: 400px) {
    .link {
      left: 35%;
    }
    .kids-img {
      width: 110px;
      height: 80px;
    }
  }
  @media (min-width: 315px) {
    .kids-container {
      grid-template-columns: auto auto;
    }
  }

  @media (min-width: 960px) {
    .kids-container {
      grid-template-columns: auto auto auto;
    }
  }

  @media (min-width: 1170px) {
    .kids-container {
      grid-template-columns: auto auto auto auto;
    }
  }
`;
export default Kids;
