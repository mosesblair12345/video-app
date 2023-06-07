import { UPDATE_FILTER, LOAD_MOVIES, FILTER_MOVIES } from "../actions";

const FilterReducer = (state, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return {
        ...state,
        all_movies: [...action.payload],
        filtered_movies: [...action.payload],
      };
    case UPDATE_FILTER:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case FILTER_MOVIES:
      const { all_movies } = state;
      let temp_movies = [...all_movies];
      temp_movies = temp_movies.filter((movie) => {
        return movie.name.toLowerCase().startsWith(state.text.toLowerCase());
      });
      return { ...state, filtered_movies: temp_movies };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default FilterReducer;
