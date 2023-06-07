import styled from "styled-components";
import Slider from "react-slick";
import { Link, useLocation } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useMoviesContext } from "../context/MoviesContext";
import Loading from "./Loading";
import Error from "./Error";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";
import { useAuthContext } from "../context/AuthContext";

const ListView = () => {
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  const location = useLocation();
  const {
    movies,
    endPage,
    movies_loading: loading,
    movies_error: error,
  } = useMoviesContext();
  let listMovies = [];

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (location.pathname === "/") {
    listMovies = movies.slice(0, endPage);
  }
  if (location.pathname === "/movies") {
    listMovies = movies.slice(0, movies.length);
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 15000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        {listMovies.map(({ id, url, buttonText, name }) => {
          return (
            <article className="container" key={id}>
              <Link to={isLoggedIn ? "/products" : "/login"}>
                <LazyLoadImage
                  src={url}
                  effect="blur"
                  placeholderSrc={blur}
                  className="movies-img"
                  alt={name}
                />
              </Link>
              <Link to={isLoggedIn ? "/products" : "/login"} className="btn">
                <FaPlay />
                <span>{buttonText}</span>
              </Link>
            </article>
          );
        })}
      </Slider>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 85vw;
  text-align: left;
  .container {
    transition: transform 0.3s;
    position: relative;
  }
  .container:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  .movies-img {
    width: 85%;
    height: 100%;
    margin: 15px auto 15px;
    border: transparent;
    border-radius: var(--radius);
  }
  .slick-prev {
    left: -50px;
  }
  .slick-next {
    right: -40px;
  }
  .slick-prev::before {
    color: #f1dec9 !important;
    font-size: 30px;
  }
  .slick-next::before {
    color: #f1dec9 !important;
    font-size: 30px;
  }

  .btn {
    position: absolute;
    bottom: 25px;
    left: 35px;
    font-size: 0.8rem;
  }
  span {
    padding-left: 10px;
  }

  @media (max-width: 992px) {
    .btn {
      font-size: 0.6rem;
    }
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

  @media (max-width: 678px) {
    .btn {
      font-size: 0.5rem;
    }
  }

  @media (max-width: 600px) {
    .btn {
      font-size: 0.6rem;
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
    .btn {
      display: none;
    }
  }

  @media (max-width: 460px) {
    .btn {
      font-size: 0.5rem;
    }
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

  @media (max-width: 430px) {
    .btn {
      font-size: 0.4rem;
    }
  }
`;
export default ListView;
