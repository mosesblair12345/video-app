import { FEEDBACK_BEGIN, FEEDBACK_SUCESS, FEEDBACK_ERROR } from "../actions";

const FeedbackReducer = (state, action) => {
  switch (action.type) {
    case FEEDBACK_BEGIN:
      return { ...state, feedbackLoading: true };
    case FEEDBACK_SUCESS:
      return { ...state, feedbackLoading: false, statusCode: action.payload };
    case FEEDBACK_ERROR:
      return { ...state, feedbackLoading: false, feedbackError: true };
    default:
      throw new Error(`No Matching "${action.type}" - action.type`);
  }
};

export default FeedbackReducer;
