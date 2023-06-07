import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import ListView from "./ListView";
import GridView from "./GridView";
import { useMoviesContext } from "../context/MoviesContext";

const Movies = () => {
  const { listview, setListView, setGridView } = useMoviesContext();

  return (
    <Wrapper>
      <div className="sort">
        <h3 style={{ marginLeft: listview && "30px" }}> Movies </h3>
        <div className="btn-container">
          <button
            type="button"
            onClick={setListView}
            className={`${listview ? "active" : null}`}
          >
            <BsList />
          </button>
          <button
            type="button"
            onClick={setGridView}
            className={`${listview ? null : "active"}`}
          >
            <BsFillGridFill />
          </button>
        </div>
      </div>
      {listview ? <ListView /> : <GridView />}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0 auto 4rem;
  width: 85vw;
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
export default Movies;
