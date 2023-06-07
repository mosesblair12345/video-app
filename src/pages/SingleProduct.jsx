import styled from "styled-components";
import { useProductsContext } from "../context/ProductsContext";
import Loading from "../components/Loading";
import Error from "../pages/ErrorPage";
import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSubscriptionContext } from "../context/SubscriptionContext";

const SingleProduct = () => {
  const { dispatch } = useSubscriptionContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/products/:id") {
      dispatch({ type: UPDATE_SUBSCRIPTION });
    }
  }, [location, dispatch]);

  const navigate = useNavigate();
  const {
    fetchSingleProduct,
    single_products_loading,
    single_product,
    single_products_error,
  } = useProductsContext();

  const { id } = useParams();
  const link = "https://movies-api-vruc.onrender.com/products/";
  const { name, url, subText, buttonText } = single_product;

  useEffect(() => {
    fetchSingleProduct(`${link}${id}`);
  }, [id]);

  if (single_products_loading) {
    return <Loading />;
  }
  if (single_products_error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="container">
        <img src={url} alt={name} />
        <div>
          <p className="paragraph">{name}</p>
          <p className="paragraph">{subText}</p>
          <button
            type="button"
            className="btn"
            onClick={() => navigate(`/subscription/${id}`)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 85vw;
  margin: auto;
  .container {
    min-height: calc(100vh - 10rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding: 70px 0;
  }
  img {
    width: 100%;
    display: block;
    width: 420px;
    height: 420px;
    object-fit: cover;
    border-radius: var(--radius);
  }
  .paragraph {
    color: #ffffff;
    text-transform: capitalize;
    font-size: 1.5rem;
  }

  @media (max-width: 1170px) {
    img {
      width: 390px;
      height: 390px;
    }
  }
  @media (max-width: 900px) {
    img {
      width: 320px;
      height: 320px;
    }
  }
  @media (max-width: 790px) {
    img {
      width: 280px;
      height: 280px;
    }
    .paragraph {
      font-size: 1rem;
    }
    .btn {
      font-size: 0.9rem;
    }
  }
  @media (max-width: 650px) {
    img {
      width: 230px;
      height: 230px;
    }
  }
  @media (max-width: 590px) {
    img {
      width: 160px;
      height: 160px;
    }
  }
  @media (max-width: 450px) {
    img {
      width: 115px;
      height: 115px;
    }
    .paragraph {
      font-size: 0.9rem;
    }
    .btn {
      font-size: 0.7rem;
    }
  }
`;
export default SingleProduct;
