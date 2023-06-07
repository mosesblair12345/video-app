import styled from "styled-components";
import vituko from "../assets/vituko.mp4";

const SeriesVideo = () => {
  return (
    <Wrapper>
      <video autoPlay muted controls loop className="series-video">
        <source src={vituko} type="video/mp4" />
      </video>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto 5rem;
  width: 90vw;
  .series-video {
    width: 100%;
    border: transparent;
    background: transparent;
  }
`;
export default SeriesVideo;
