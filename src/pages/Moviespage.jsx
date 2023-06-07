import Movies from "../components/Movies";
import MoviesVideo from "../components/MoviesVideo";
import styled from "styled-components";
const Moviespage = () => {
  return (
    <Wrapper>
      <div className="link-container">
        <a href="#movies-video" className="link">
          movie trailer
        </a>
        <a href="#movies" className="link">
          / movies
        </a>
      </div>
      <section id="movies-video">
        <MoviesVideo />
      </section>
      <section id="movies">
        <Movies />
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: calc(100vh - 10rem);
  .link-container {
    width: 90vw;
    margin: 0 auto 1rem;
  }
  .link {
    color: #ffffff;
    margin-right: 30px;
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  .link:hover {
    color: #7f1ae5;
  }
  @media (max-width: 992px) {
    .link {
      display: none;
    }
  }
`;
export default Moviespage;
