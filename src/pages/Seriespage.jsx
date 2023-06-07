import Series from "../components/Series";
import styled from "styled-components";
import SeriesVideo from "../components/SeriesVideo";

const Seriespage = () => {
  return (
    <Wrapper>
      <div className="link-container">
        <a href="#series-video" className="link">
          series trailer
        </a>
        <a href="#series" className="link">
          / series
        </a>
      </div>
      <section id="series-video">
        <SeriesVideo />
      </section>
      <section id="series">
        <Series />
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

export default Seriespage;
