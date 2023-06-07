import Products from "../components/Products";
import styled from "styled-components";
import { useSubscriptionContext } from "../context/SubscriptionContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UPDATE_SUBSCRIPTION } from "../actions";
const ProductsPage = () => {
  const { dispatch } = useSubscriptionContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/products") {
      dispatch({ type: UPDATE_SUBSCRIPTION });
    }
  }, [location, dispatch]);
  return (
    <Wrapper>
      <Products />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: calc(100vh - 10rem);
`;
export default ProductsPage;
