import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/FeedbackReducer";
import Cookies from "js-cookie";
import SHA256 from "crypto-js/sha256";

const initialState = {
  statusCode: "",
  feedbackLoading: "",
  feedbackError: "",
};

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const order = Cookies.get("order");
  const auth = Cookies.get("auth");
  const orderHash = Cookies.get("orderHash");
  const authHash = Cookies.get("authHash");

  let orderHashedValue = "";
  let authHashedValue = "";

  orderHashedValue = SHA256(order).toString();
  authHashedValue = SHA256(auth).toString();

  return (
    <FeedbackContext.Provider
      value={{
        ...state,
        orderHashedValue,
        orderHash,
        authHashedValue,
        authHash,
        dispatch,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeeedbackContext = () => {
  return useContext(FeedbackContext);
};
