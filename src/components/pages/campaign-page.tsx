import { Stack } from "@mui/material";
import CampaignContent from "./components/campaign-content";
import CampaignHeader from "./components/campaign-header";

const CampaignPage = () => {
  return (
    <Stack direction="column" spacing={2}>
      <CampaignHeader />
      <CampaignContent />
    </Stack>
  );
};

export default CampaignPage;
