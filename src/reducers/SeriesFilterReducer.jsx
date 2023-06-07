import { UPDATE_SERIES_FILTER, LOAD_SERIES, FILTER_SERIES } from "../actions";

const FilterReducer = (state, action) => {
  switch (action.type) {
    case LOAD_SERIES:
      return {
        ...state,
        all_series: [...action.payload],
        filtered_series: [...action.payload],
      };
    case UPDATE_SERIES_FILTER:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case FILTER_SERIES:
      const { all_series } = state;
      let temp_series = [...all_series];
      temp_series = temp_series.filter((serie) => {
        return serie.name
          .toLowerCase()
          .startsWith(state.series_text.toLowerCase());
      });
      return { ...state, filtered_series: temp_series };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default FilterReducer;
