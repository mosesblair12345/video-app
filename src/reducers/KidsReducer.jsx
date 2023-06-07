import { GET_KIDS_BEGIN, GET_KIDS_SUCESS, GET_KIDS_ERROR } from "../actions";

const KidsReducer = (state, action) => {
  switch (action.type) {
    case GET_KIDS_BEGIN:
      return { ...state, kids_loading: true };
    case GET_KIDS_SUCESS:
      return { ...state, kids: action.payload, kids_loading: false };
    case GET_KIDS_ERROR:
      return { ...state, movies_loading: false, movies_error: true };
    default:
      throw new Error(`No Matching "${action.type}" - action.type`);
  }
};

export default KidsReducer;
