import {
  SET_LISTVIEW,
  SET_GRIDVIEW,
  GET_MOVIES_BEGIN,
  GET_MOVIES_SUCESS,
  GET_MOVIES_ERROR,
} from "../actions";

const MoviesReducer = (state, action) => {
  switch (action.type) {
    case SET_LISTVIEW:
      return { ...state, listview: true };
    case SET_GRIDVIEW:
      return { ...state, listview: false };
    case GET_MOVIES_BEGIN:
      return { ...state, movies_loading: true };
    case GET_MOVIES_SUCESS:
      return { ...state, movies: action.payload, movies_loading: false };
    case GET_MOVIES_ERROR:
      return { ...state, movies_loading: false, movies_error: true };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
export default MoviesReducer;
