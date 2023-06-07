import { useContext, useReducer, createContext, useEffect } from "react";
import {
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
import reducer from "../reducers/ProductsReducer";
import axios from "axios";

const ProductContext = createContext();
const url = "https://movies-api-vruc.onrender.com/products";

export const ProductsProvider = ({ children }) => {
  const initialState = {
    products_loading: true,
    products_error: false,
    products: [],
    single_product: [],
    single_products_loading: true,
    single_products_error: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = (url) => {
    dispatch({ type: GET_PRODUCTS_LOADING });
    axios
      .get(url)
      .then((resp) => {
        const products = resp.data;
        dispatch({ type: GET_PRODUCTS_SUCESS, payload: products });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_PRODUCTS_ERROR });
      });
  };
  const fetchSingleProduct = (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_LOADING });
    axios
      .get(url)
      .then((resp) => {
        const singleProduct = resp.data;
        dispatch({ type: GET_SINGLE_PRODUCT_SUCESS, payload: singleProduct });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
      });
  };
  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductContext);
};
