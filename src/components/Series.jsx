import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useSeriesContext } from "../context/SeriesContext";
import SeriesGridView from "./SeriesGridView";
import SeriesListView from "./SeriesListView";

const Series = () => {
  const { listview, setSeriesListView, setSeriesGridView } = useSeriesContext();
  return (
    <Wrapper>
      <div className="sort">
        <h3 style={{ marginLeft: listview && "30px" }}> Series </h3>
        <div className="btn-container">
          <button
            type="button"
            onClick={setSeriesListView}
            className={`${listview ? "active" : null}`}
          >
            <BsList />
          </button>
          <button
            type="button"
            onClick={setSeriesGridView}
            className={`${listview ? null : "active"}`}
          >
            <BsFillGridFill />
          </button>
        </div>
      </div>
      {listview ? <SeriesListView /> : <SeriesGridView />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 85vw;
  margin: 0 auto 4rem;
  h3 {
    margin-top: 1.3rem;
    margin-bottom: 1rem;
    text-align: left;
  }
  .sort {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    margin: 0;
    svg {
      font-size: 1.7rem;
    }
  }

  button {
    background: transparent;
    border: transparent;
    color: #ffffff;
  }
  button:hover {
    cursor: pointer;
    color: #7f1ae5;
    opacity: 0.3;
  }
  .active {
    color: #7100e2;
  }
  .wrapper-container {
    display: grid;
    margin-left: 0;
  }

  @media (min-width: 315px) {
    .wrapper-container {
      grid-template-columns: auto auto;
    }
  }

  @media (min-width: 960px) {
    .wrapper-container {
      grid-template-columns: auto auto auto;
    }
  }

  @media (min-width: 1170px) {
    .wrapper-container {
      grid-template-columns: auto auto auto auto;
    }
  }
`;
export default Series;
