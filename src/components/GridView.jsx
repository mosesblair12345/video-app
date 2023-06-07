import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useMoviesContext } from "../context/MoviesContext";
import Loading from "./Loading";
import Error from "./Error";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";
import { useFilterContext } from "../context/FilterContext";
import { useAuthContext } from "../context/AuthContext";

const GridView = () => {
  const { token } = useAuthContext();
  const isLoggedIn = !!token;
  const location = useLocation();
  const {
    endPage,
    movies_loading: loading,
    movies_error: error,
  } = useMoviesContext();
  const { filtered_movies: movies, text, updateFilter } = useFilterContext();
  let gridMovies = [];

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (location.pathname === "/") {
    gridMovies = movies.slice(0, endPage);
  }
  if (location.pathname === "/movies") {
    gridMovies = movies.slice(0, movies.length);
  }

  return (
    <Wrapper>
      <div className="search-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="search"
            className="search-input"
            value={text}
            onChange={updateFilter}
            autoComplete="off"
          />
        </form>
      </div>
      {movies.length < 1 ? (
        <h4 className="headings">There no movies that match your search</h4>
      ) : (
        <section className="wrapper-container">
          {gridMovies.map(({ id, url, name }) => {
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
                        gridMovies.length === 1
                          ? "25%"
                          : gridMovies.length === 2
                          ? "30%"
                          : gridMovies.length === 3
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
      {location.pathname === "/" && movies.length >= 1 ? (
        <Link to="/movies" className="btn load-btn">
          Load More
        </Link>
      ) : null}
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
  .load-btn {
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
    .load-btn {
      font-size: 0.9rem;
    }
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
    .load-btn {
      font-size: 0.6rem;
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

export default GridView;
