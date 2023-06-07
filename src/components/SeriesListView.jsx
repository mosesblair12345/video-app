import styled from "styled-components";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";
import { useSeriesContext } from "../context/SeriesContext";
import { useAuthContext } from "../context/AuthContext";

const SeriesListView = () => {
  const { series, series_loading, series_error } = useSeriesContext();
  const { token } = useAuthContext();
  const isLoggedIn = !!token;

  if (series_loading) {
    return <Loading />;
  }
  if (series_error) {
    return <Error />;
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 15000,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {series.map(({ id, url, buttonText, name }) => {
          return (
            <article className="container" key={id}>
              <Link to={isLoggedIn ? "/products" : "/login"}>
                <LazyLoadImage
                  src={url}
                  effect="blur"
                  placeholderSrc={blur}
                  className="series-img"
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
    transform: scale(1.1);
  }
  .series-img {
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
  .slick-dots li button:before {
    color: #b3541e !important;
    opacity: 0.29;
    font-size: 10px;
  }
  .slick-dots li.slick-active button:before {
    color: #ffffff !important;
    opacity: 0.75;
  }
  .btn {
    position: absolute;
    bottom: 30px;
    left: 65px;
    font-size: 0.8rem;
  }
  span {
    padding-left: 10px;
  }

  @media (max-width: 992px) {
    .btn {
      font-size: 0.6rem;
      left: 50px;
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
    .btn {
      left: 40px;
    }
  }

  @media (max-width: 678px) {
    .btn {
      font-size: 0.5rem;
      left: 35px;
      bottom: 25px;
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
      font-size: 0.3rem;
      left: 29px;
      bottom: 23px;
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
export default SeriesListView;
