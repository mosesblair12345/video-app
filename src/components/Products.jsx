import styled from "styled-components";
import { useProductsContext } from "../context/ProductsContext";
import Loading from "../components/Loading";
import Error from "./Error";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blur from "../assets/blur.jpg";

const Products = () => {
  const { products, products_loading, products_error } = useProductsContext();

  if (products_loading) {
    return <Loading />;
  }
  if (products_error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="products-container">
        {products.map(({ id, url, name }) => {
          return (
            <div className="grid-container" key={id}>
              <div className="img-container">
                <Link to={`/products/${id}`}>
                  <LazyLoadImage
                    src={url}
                    alt={name}
                    effect="blur"
                    placeholderSrc={blur}
                  />
                </Link>
                <Link to={`/products/${id}`} className="link">
                  <FaSearch />
                </Link>
              </div>
              <p className="products-paragraph">
                <strong>{name}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 85vw;
  text-align: left;
  margin: auto;
  .products-container {
    display: grid;
    margin-left: 0;
    column-gap: 1rem;
  }
  .grid-container {
    margin-top: 30%;
  }
  .img-container {
    transition: transform 0.3s;
    position: relative;
  }
  .img-container:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .link {
    position: absolute;
    top: 45%;
    left: 40%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: #7100e2;
    }
  }

  img {
    width: 100%;
    display: block;
    width: 260px;
    height: 260px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  .img-container:hover img {
    opacity: 0.5;
  }
  .img-container:hover .link {
    opacity: 1;
  }
  .products-paragraph {
    color: #ffffff;
    text-align: left;
    text-transform: capitalize;
  }
  @media (max-width: 1170px) {
    .link {
      left: 28%;
    }
  }
  @media (max-width: 950px) {
    .link {
      left: 35%;
    }
  }
  @media (max-width: 700px) {
    img {
      width: 200px;
      height: 200px;
    }
    .link {
      width: 2rem;
      height: 2rem;
      svg {
        font-size: 1rem;
      }
    }
  }
  @media (max-width: 570px) {
    img {
      width: 170px;
      height: 170px;
    }
  }
  @media (max-width: 460px) {
    img {
      width: 130px;
      height: 130px;
    }
  }
  @media (max-width: 400px) {
    .products-paragraph {
      font-size: 0.7rem;
    }
    .link {
      left: 42%;
    }
  }

  @media (min-width: 319px) {
    .products-container {
      grid-template-columns: auto auto;
    }
  }

  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: auto auto auto auto;
    }
  }
`;

export default Products;
