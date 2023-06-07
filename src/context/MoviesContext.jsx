import { useContext, createContext, useReducer } from "react";
import {
  SET_LISTVIEW,
  SET_GRIDVIEW,
  GET_MOVIES_BEGIN,
  GET_MOVIES_SUCESS,
  GET_MOVIES_ERROR,
} from "../actions";
import reducer from "../reducers/MoviesReducer";
import { useEffect } from "react";
import axios from "axios";
const url = "https://movies-api-vruc.onrender.com/";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const initialState = {
    listview: true,
    endPage: 12,
    movies: [],
    movies_loading: true,
    movies_error: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const fetchMovies = (url) => {
    dispatch({ type: GET_MOVIES_BEGIN });
    axios
      .get(url)
      .then((resp) => {
        const movies = resp.data;
        dispatch({ type: GET_MOVIES_SUCESS, payload: movies });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_MOVIES_ERROR });
      });
  };

  useEffect(() => {
    fetchMovies(url);
  }, []);
  return (
    <MoviesContext.Provider
      value={{
        ...state,
        setListView,
        setGridView,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  return useContext(MoviesContext);
};
