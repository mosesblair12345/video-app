import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/FilterReducer";
import { UPDATE_FILTER, LOAD_MOVIES, FILTER_MOVIES } from "../actions";
import { useMoviesContext } from "./MoviesContext";
import { useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const initialState = {
    all_movies: [],
    filtered_movies: [],
    text: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies } = useMoviesContext();
  const updateFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };
  useEffect(() => {
    dispatch({ type: LOAD_MOVIES, payload: movies });
  }, [movies]);
  useEffect(() => {
    dispatch({ type: FILTER_MOVIES });
  }, [movies, state.text]);
  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
