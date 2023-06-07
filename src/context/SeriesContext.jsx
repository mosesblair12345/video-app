import { useContext, createContext, useReducer } from "react";
import {
  GET_SERIES_BEGIN,
  GET_SERIES_SUCESS,
  GET_SERIES_ERROR,
  SET_SERIES_GRIDVIEW,
  SET_SERIES_LISTVIEW,
} from "../actions";
import reducer from "../reducers/SeriesReducer";
import { useEffect } from "react";
import axios from "axios";
const url = "https://movies-api-vruc.onrender.com/series";

const SeriesContext = createContext();

export const SeriesProvider = ({ children }) => {
  const initialState = {
    series: [],
    series_loading: true,
    series_error: false,
    listview: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setSeriesListView = () => {
    dispatch({ type: SET_SERIES_LISTVIEW });
  };

  const setSeriesGridView = () => {
    dispatch({ type: SET_SERIES_GRIDVIEW });
  };

  const fetchSeries = (url) => {
    dispatch({ type: GET_SERIES_BEGIN });
    axios
      .get(url)
      .then((resp) => {
        const series = resp.data;
        dispatch({ type: GET_SERIES_SUCESS, payload: series });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_SERIES_ERROR });
      });
  };

  useEffect(() => {
    fetchSeries(url);
  }, []);
  return (
    <SeriesContext.Provider
      value={{
        ...state,
        setSeriesGridView,
        setSeriesListView,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};

export const useSeriesContext = () => {
  return useContext(SeriesContext);
};
