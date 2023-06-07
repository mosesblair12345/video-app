import {
  GET_SERIES_BEGIN,
  GET_SERIES_SUCESS,
  GET_SERIES_ERROR,
  SET_SERIES_GRIDVIEW,
  SET_SERIES_LISTVIEW,
} from "../actions";

const SeriesReducer = (state, action) => {
  switch (action.type) {
    case SET_SERIES_LISTVIEW:
      return { ...state, listview: true };
    case SET_SERIES_GRIDVIEW:
      return { ...state, listview: false };
    case GET_SERIES_BEGIN:
      return { ...state, series_loading: true };
    case GET_SERIES_SUCESS:
      return { ...state, series: action.payload, series_loading: false };
    case GET_SERIES_ERROR:
      return { ...state, series_loading: false, series_error: true };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default SeriesReducer;
