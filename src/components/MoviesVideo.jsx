import styled from "styled-components";
import { useState } from "react";
import { moviesVideo } from "../utils/constants";

const MoviesVideo = () => {
  const [main, setMain] = useState(moviesVideo[0]);
  return (
    <Wrapper>
      <section className="videos-section">
        <video
          key={main.videoSrc}
          autoPlay
          muted
          controls
          loop
          className="movies-video"
        >
          <source src={main.videoSrc} type="video/mp4" />
        </video>
      </section>

      <section className="img-section">
        {moviesVideo.map((video, index) => {
          const { id, name, imgSrc } = video;
          return (
            <article key={id}>
              <img
                src={imgSrc}
                alt={name}
                className={`${
                  video.videoSrc === main.videoSrc
                    ? "active movies-img"
                    : "movies-img"
                }`}
                onClick={() => setMain(moviesVideo[index])}
              />
            </article>
          );
        })}
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto 5rem;
  text-align: center;
  .videos-section {
    margin: 0 auto;
    width: 90vw;
  }
  .img-section {
    margin: 2rem auto 0;
    width: 60vw;
    display: grid;
    column-gap: 1rem;
    grid-template-columns: auto auto;
  }
  .movies-video {
    width: 100%;
    border: transparent;
    background: transparent;
  }
  .movies-video:hover {
    cursor: pointer;
  }
  .movies-img {
    width: 250px;
    height: 150px;
    object-fit: cover;
    cursor: pointer;
    border-radius: var(--radius);
    transition: transform 0.3s;
  }
  .movies-img:hover {
    transform: scale(1.2);
  }
  .active {
    box-shadow: 0px 0px 0px 3px #7100e2;
  }
  @media (max-width: 990px) {
    .movies-img {
      width: 200px;
      height: 100px;
    }
  }
  @media (max-width: 760px) {
    .movies-img {
      width: 150px;
      height: 85px;
    }
  }
  @media (max-width: 635px) {
    .movies-img {
      width: 120px;
      height: 70px;
    }
  }
  @media (max-width: 495px) {
    .movies-img {
      width: 75px;
      height: 55px;
    }
  }
`;
export default MoviesVideo;
