import {
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_LOADING,
  GET_SINGLE_PRODUCT_SUCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
const ProductsReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LOADING:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCESS:
      return { ...state, products_loading: false, products: action.payload };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_error: true, products_loading: false };
    case GET_SINGLE_PRODUCT_LOADING:
      return { ...state, single_products_loading: true };
    case GET_SINGLE_PRODUCT_SUCESS:
      return {
        ...state,
        single_products_loading: false,
        single_product: action.payload,
        single_products_error: false,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_products_loading: false,
        single_products_error: true,
      };
    default:
      throw new Error(`There is no matching "${action.type}" -action type`);
  }
};
export default ProductsReducer;
