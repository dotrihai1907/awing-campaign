import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import {
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "./campaign.model";
import { addSubCampaign } from "./campaign.util";
import AdsCampaignInfo from "./components/ads-campaign-info";
import SubCampaignCard from "./components/sub-campaign-card";
import SubCampaignInfo from "./components/sub-campaign-info";

export type SubCampaignsTabType = {
  errorList: ErrorListType | null;
  subCampaignsData: SubCampaignsType[];
  setData: React.Dispatch<React.SetStateAction<CampaignDataType>>;
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>;
};

const SubCampaignsTab = (props: SubCampaignsTabType) => {
  const { errorList, subCampaignsData, setData, setErrorList } = props;

  const isAddRef = useRef<boolean>(false);

  const [activeSub, setActiveSub] = useState<SubCampaignsType>(
    subCampaignsData[0]
  );

  const handleAddSubCampaign = () => {
    addSubCampaign(setData);
    isAddRef.current = true;
  };

  useLayoutEffect(() => {
    if (isAddRef.current) {
      setActiveSub(subCampaignsData[subCampaignsData.length - 1]);
      isAddRef.current = false;
      document
        .querySelector(
          `.${subCampaignsData[subCampaignsData.length - 1].uniqId}`
        )
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [subCampaignsData]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <IconButton
          size="large"
          color="primary"
          sx={{ background: "#1976d20a" }}
          onClick={handleAddSubCampaign}
        >
          <AddIcon />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            overflowX: "auto",
            gap: "12px",
          }}
        >
          {subCampaignsData.map((campaign) => (
            <SubCampaignCard
              key={campaign.uniqId}
              campaign={campaign}
              activeSub={activeSub}
              errorList={errorList}
              subCampaignsData={subCampaignsData}
              setActiveSub={setActiveSub}
              setData={setData}
            />
          ))}
        </Box>
      </Box>
      <SubCampaignInfo
        setData={setData}
        activeSub={activeSub}
        errorList={errorList}
        setErrorList={setErrorList}
      />
      <AdsCampaignInfo
        activeSub={activeSub}
        setData={setData}
        errorList={errorList}
        setErrorList={setErrorList}
      />
    </Box>
  );
};

export default SubCampaignsTab;
