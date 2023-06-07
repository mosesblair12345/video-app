import {
  SET_SUBSCRIPTION_VALUES,
  CHECK_SUBSCRIPTION_VALUES,
  SUBSCRIPTION_BEGIN,
  SUBSCRIPTION_SUCESS,
  SUBSCRIPTION_ERROR,
  UPDATE_SUBSCRIPTION,
} from "../actions";
import Cookies from "js-cookie";
import SHA256 from "crypto-js/sha256";

const SubscriptionReducer = (state, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_VALUES:
      const { subscriptionName, subscriptionValue } = action.payload;
      return { ...state, [subscriptionName]: subscriptionValue };
    case CHECK_SUBSCRIPTION_VALUES:
      const { firstNames, lastNames, phone, checked } = state;
      if (firstNames === "") {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "Please fill in first name",
            lastNamesError: "",
            phoneError: "",
            checkedError: "",
          },
        };
      }
      if (lastNames === "") {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "",
            lastNamesError: "Please fill in last name",
            phoneError: "",
            checkedError: "",
          },
        };
      }
      if (phone === "") {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "",
            lastNamesError: "",
            phoneError: "Billing Phone is a required field.",
            checkedError: "",
          },
        };
      }
      if (phone.length < 10) {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "",
            lastNamesError: "",
            phoneError:
              "Please input a correct phone number and formart eg 0745671868",
            checkedError: "",
          },
        };
      }
      if (phone.length > 10) {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "",
            lastNamesError: "",
            phoneError:
              "Please input a correct phone number and formart eg 0745671868",
            checkedError: "",
          },
        };
      }
      if (!checked) {
        return {
          ...state,
          values_okay: false,
          subscriptionError: {
            ...state.subscriptionError,
            firstNamesError: "",
            lastNamesError: "",
            phoneError: "",
            checkedError:
              "Please read and accept the terms and conditions to proceed with your order.",
          },
        };
      }
      return {
        ...state,
        values_okay: false,
        subscriptionError: {
          ...state.subscriptionError,
          firstNamesError: "",
          lastNamesError: "",
          phoneError: "",
          checkedError: "",
        },
      };
    case SUBSCRIPTION_BEGIN:
      return { ...state, subscription_loading: true };

    case SUBSCRIPTION_SUCESS:
      const { redirect_url, order_tracking_id, Authorization } = action.payload;

      const order = order_tracking_id;
      const orderHash = SHA256(order_tracking_id);

      const auth = Authorization;
      const authHash = SHA256(Authorization);

      Cookies.set("order", order, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("orderHash", orderHash, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("auth", auth, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("authHash", authHash, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("order_tracking_id", order_tracking_id, {
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("pesapalToken", Authorization, {
        secure: true,
        sameSite: "Strict",
      });

      return {
        ...state,
        subscription_loading: false,
        subscription_url: redirect_url,
        trackingId: order_tracking_id,
        pesapalToken: Authorization,
        firstNames: "",
        lastNames: "",
        phone: "",
        checked: "",
      };
    case SUBSCRIPTION_ERROR:
      return {
        ...state,
        subscription_loading: false,
        subscription_error: true,
      };
    case UPDATE_SUBSCRIPTION:
      return { ...state, subscription_url: "" };
    default:
      throw new Error(`There is no matching "${action.type}" -action type"`);
  }
};
export default SubscriptionReducer;
