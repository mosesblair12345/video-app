import { GET_KIDS_BEGIN, GET_KIDS_SUCESS, GET_KIDS_ERROR } from "../actions";
import { useContext, createContext, useReducer } from "react";
import reducer from "../reducers/KidsReducer";
const url = "https://movies-api-vruc.onrender.com/kids";
import axios from "axios";
import { useEffect } from "react";

const KidsContext = createContext();

export const KidsProvider = ({ children }) => {
  const initialState = {
    kids_loading: true,
    kids_error: false,
    kids: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchKids = (url) => {
    dispatch({ type: GET_KIDS_BEGIN });
    axios
      .get(url)
      .then((resp) => {
        dispatch({ type: GET_KIDS_SUCESS, payload: resp.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_KIDS_ERROR });
      });
  };

  useEffect(() => {
    fetchKids(url);
  }, []);

  return (
    <KidsContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </KidsContext.Provider>
  );
};

export const useKidsContext = () => {
  return useContext(KidsContext);
};
