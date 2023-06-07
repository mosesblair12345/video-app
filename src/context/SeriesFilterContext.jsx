import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/SeriesFilterReducer";
import { UPDATE_SERIES_FILTER, LOAD_SERIES, FILTER_SERIES } from "../actions";
import { useSeriesContext } from "./SeriesContext";
import { useEffect } from "react";

const SeriesFilterContext = createContext();

export const SeriesFilterProvider = ({ children }) => {
  const initialState = {
    all_series: [],
    filtered_series: [],
    series_text: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { series } = useSeriesContext();
  const updateSeriesFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SERIES_FILTER, payload: { name, value } });
  };
  useEffect(() => {
    dispatch({ type: LOAD_SERIES, payload: series });
  }, [series]);
  useEffect(() => {
    dispatch({ type: FILTER_SERIES });
  }, [series, state.series_text]);
  return (
    <SeriesFilterContext.Provider
      value={{
        ...state,
        updateSeriesFilter,
      }}
    >
      {children}
    </SeriesFilterContext.Provider>
  );
};

export const useSeriesFilterContext = () => {
  return useContext(SeriesFilterContext);
};
