import styled from "styled-components";
import Kids from "../components/Kids";

const KidsPage = () => {
  return (
    <Wrapper>
      <Kids />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: calc(100vh - 10rem);
`;
export default KidsPage;
