import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper className="page-100">
      <h1>404</h1>
      <h3>Opps page not found !</h3>
      <Link to="/" className="btn">
        Home
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: capitalize;
    margin-bottom: 2rem;
  }
`;
export default Error;
