import styled from "styled-components";
import CampaignPage from "./components/pages/campaign-page";

function App() {
  return (
    <StyledApp>
      <CampaignPage />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  width: 1280px;
  padding: 24px;
  margin: auto;
`;
