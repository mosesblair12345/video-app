import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSeriesContext } from "../context/SeriesContext";
import Loading from "./Loading";
import Error from "./Error";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";
import { useSeriesFilterContext } from "../context/SeriesFilterContext";
import { useAuthContext } from "../context/AuthContext";

const SeriesGridView = () => {
  const { series_loading: loading, series_error: error } = useSeriesContext();
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  const {
    filtered_series: series,
    series_text,
    updateSeriesFilter,
  } = useSeriesFilterContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="search-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="series_text"
            placeholder="search"
            className="search-input"
            value={series_text}
            onChange={updateSeriesFilter}
            autoComplete="off"
          />
        </form>
      </div>
      {series.length < 1 ? (
        <h4 className="headings">There no series that match your search</h4>
      ) : (
        <section className="wrapper-container">
          {series.map(({ id, url, name }) => {
            return (
              <div key={id} className="grid-container">
                <div className="img-container">
                  <Link to={isLoggedIn ? "/products" : "/login"}>
                    <LazyLoadImage
                      src={url}
                      effect="blur"
                      placeholderSrc={blur}
                      className="grid-img"
                      alt={name}
                    />
                  </Link>
                  <Link
                    to={isLoggedIn ? "/products" : "/login"}
                    className="link"
                    style={{
                      left:
                        series.length === 1
                          ? "25%"
                          : series.length === 2
                          ? "30%"
                          : series.length === 3
                          ? "32%"
                          : null,
                    }}
                  >
                    <FaPlay />
                  </Link>
                </div>
                <p className="grid-paragraph">
                  <strong>{name}</strong>
                </p>
              </div>
            );
          })}
        </section>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .grid-container {
    transition: transform 0.3s;
    text-align: left;
  }
  .grid-container:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .img-container {
    position: relative;
  }
  img {
    width: 100%;
    display: block;
    width: 230px;
    height: 120px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .link {
    position: absolute;
    top: 45%;
    left: 40%;
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
  .img-container:hover img {
    opacity: 0.5;
  }
  .img-container:hover .link {
    opacity: 1;
  }
  .grid-paragraph {
    color: #ffffff;
    text-transform: capitalize;
    text-align: left;
  }
  .search-container {
    text-align: left;
    margin-bottom: 2rem;
  }
  .search-input {
    padding: 0.8rem;
    background: #ffffff;
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: 0.1rem;
    width: 33%;
    font-size: 0.9rem;
    outline: none !important;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  .headings {
    font-size: 1.2rem;
    text-align: left;
    margin-top: 25px;
  }
  @media (max-width: 960px) {
    .link {
      left: 30%;
    }
    .search-input {
      width: 50%;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 780px) {
    .link {
      left: 35%;
    }
  }

  @media (max-width: 680px) {
    img {
      width: 200px;
      height: 100px;
    }
    .load-btn {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 590px) {
    img {
      width: 150px;
      height: 80px;
    }
    .link {
      width: 1.8rem;
      height: 1.8rem;
      svg {
        font-size: 0.7rem;
      }
    }
  }

  @media (max-width: 450px) {
    .link {
      width: 1.5rem;
      height: 1.5rem;
      svg {
        font-size: 0.4rem;
      }
    }
    img {
      width: 120px;
      height: 80px;
    }
    .search-input {
      width: 50%;
      font-size: 0.7rem;
      padding: 0.6rem;
    }
  }
`;
export default SeriesGridView;
