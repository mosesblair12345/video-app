import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/SubscriptionReducer";
import {
  SET_SUBSCRIPTION_VALUES,
  CHECK_SUBSCRIPTION_VALUES,
  SUBSCRIPTION_BEGIN,
  SUBSCRIPTION_SUCESS,
  SUBSCRIPTION_ERROR,
} from "../actions";

import { useProductsContext } from "./ProductsContext";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  firstNames: "",
  lastNames: "",
  phone: "",
  checked: false,
  values_okay: false,
  subscription_loading: false,
  subscription_error: false,
  subscription_url: "",
  trackingId: "",
  pesapalToken: "",
  subscriptionError: {
    firstNamesError: "",
    lastNamesError: "",
    phoneError: "",
    checkedError: "",
  },
};

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const _email = Cookies.get("_email");
  const {
    single_product: { ammount },
  } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const setSubscriptionValues = (e) => {
    const subscriptionName = e.target.name;
    let subscriptionValue = e.target.value;
    if (subscriptionName === "checked") {
      subscriptionValue = e.target.checked;
    }
    dispatch({
      type: SET_SUBSCRIPTION_VALUES,
      payload: { subscriptionName, subscriptionValue },
    });
  };
  const checkSubscriptionValues = () => {
    if (
      state.checked &&
      state.phone.length === 10 &&
      state.lastNames.length > 0 &&
      state.firstNames.length > 0
    ) {
      dispatch({ type: SUBSCRIPTION_BEGIN });
      axios
        .post("https://movies-api-vruc.onrender.com/pesapalInitial", {
          firstName: state.firstNames,
          lastName: state.lastNames,
          phone: state.phone,
          email: _email,
          ammount: ammount,
        })
        .then((response) => {
          const { redirect_url, order_tracking_id, Authorization } =
            response.data;
          dispatch({
            type: SUBSCRIPTION_SUCESS,
            payload: { redirect_url, order_tracking_id, Authorization },
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: SUBSCRIPTION_ERROR });
        });
    }
  };
  useEffect(() => {
    dispatch({ type: CHECK_SUBSCRIPTION_VALUES });
  }, [state.firstNames, state.lastNames, state.phone, state.checked]);

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        setSubscriptionValues,
        checkSubscriptionValues,
        dispatch,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionContext = () => {
  return useContext(SubscriptionContext);
};
