import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay } from "react-icons/fa";
import Slider from "react-slick";
import { carousel } from "../utils/constants";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Carousel = () => {
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {carousel.map(({ id, url, name, genres, buttonText }) => {
          return (
            <article key={id} className="carousel-container">
              <img src={url} alt={name} className="carousel-img" />
              <div className="all">
                <p className="name">Title: {name}</p>
                <p className="genres">Genres: {genres}</p>
                <Link to={isLoggedIn ? "/products" : "/login"} className="btn">
                  <FaPlay />
                  <span>{buttonText}</span>
                </Link>
              </div>
            </article>
          );
        })}
      </Slider>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto 5rem;
  text-align: left;
  width: 85vw;
  .carousel-container {
    position: relative;
  }
  .carousel-img {
    width: 100%;
  }
  .all {
    position: absolute;
    bottom: 20px;
    left: 16px;
    text-align: left;
  }
  .name {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 0;
    text-transform: capitalize;
  }
  .genres {
    font-size: 1.8rem;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  .slick-prev {
    left: -50px;
  }
  .slick-next {
    right: -40px;
  }
  .slick-prev::before {
    color: #f1dec9 !important;
    font-size: 35px;
  }
  .slick-next::before {
    color: #f1dec9 !important;
    font-size: 35px;
  }
  span {
    padding-left: 10px;
  }
  .btn {
    font-size: 1.1rem;
  }

  @media (max-width: 990px) {
    .slick-prev::before {
      font-size: 28px;
    }
    .slick-next::before {
      font-size: 28px;
    }
    .slick-next {
      right: -35px;
    }
    .slick-prev {
      left: -40px;
    }
    .name {
      font-size: 1.5rem;
    }
    .genres {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 760px) {
    .name {
      font-size: 1.1rem;
    }
    .genres {
      font-size: 1.1rem;
    }
    .btn {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 720px) {
    .slick-prev::before {
      font-size: 25px;
    }
    .slick-next::before {
      font-size: 25px;
    }
    .slick-next {
      right: -25px;
    }
    .slick-prev {
      left: -30px;
    }
  }

  @media (max-width: 570px) {
    .slick-prev::before {
      font-size: 20px;
    }
    .slick-next::before {
      font-size: 20px;
    }
    .slick-next {
      right: -25px;
    }
    .slick-prev {
      left: -25px;
    }
  }

  @media (max-width: 510px) {
    .name {
      font-size: 0.8rem;
    }
    .genres {
      font-size: 0.8rem;
    }
    .btn {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 460px) {
    .slick-prev::before {
      font-size: 18px;
    }
    .slick-next::before {
      font-size: 18px;
    }
    .slick-next {
      right: -20px;
    }
    .slick-prev {
      left: -20px;
    }
  }
`;
export default Carousel;
