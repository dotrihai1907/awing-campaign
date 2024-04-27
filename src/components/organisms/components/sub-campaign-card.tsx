import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import {
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "../campaign.model";
import { caculateAds, deleteSubCampaign } from "../campaign.util";

export type SubCampaignCardtype = {
  campaign: SubCampaignsType;
  activeSub: SubCampaignsType;
  errorList: ErrorListType | null;
  subCampaignsData: SubCampaignsType[];
  setData: React.Dispatch<React.SetStateAction<CampaignDataType>>;
  setActiveSub: React.Dispatch<React.SetStateAction<SubCampaignsType>>;
};

const SubCampaignCard = (props: SubCampaignCardtype) => {
  const {
    setData,
    campaign,
    activeSub,
    errorList,
    setActiveSub,
    subCampaignsData,
  } = props;

  const isError = useMemo(() => {
    if (errorList) {
      const campaignIndex = errorList.subCampaigns.findIndex(
        (error) => error.uniqId === campaign.uniqId
      );
      if (campaignIndex === -1) return false;
      return errorList.subCampaigns[campaignIndex].ads.some((el) => el.isError);
    } else return false;
  }, [campaign.uniqId, errorList]);

  const handleSelectSubCampaign = (selectSub: SubCampaignsType) => {
    setActiveSub(selectSub);
  };

  const handleDeleteSubCampaign = (selectSub: SubCampaignsType) => {
    deleteSubCampaign(
      selectSub,
      activeSub,
      subCampaignsData,
      setData,
      setActiveSub
    );
  };

  return (
    <Card
      variant="outlined"
      className={campaign.uniqId}
      onClick={() => handleSelectSubCampaign(campaign)}
      sx={{
        minWidth: "180px",
        maxWidth: "180px",
        minHeight: "153px",
        maxHeight: "153px",
        cursor: `${subCampaignsData.length > 1 && "pointer"}`,
        border: `${
          campaign.uniqId === activeSub.uniqId && "2px solid #1976d2"
        }`,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            gap: "5px",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Campaigns
          </Typography>
          <CheckCircleRoundedIcon
            sx={{ fontSize: "14px" }}
            color={campaign.status ? "success" : "disabled"}
          />
        </Box>
        <Tooltip title={campaign.name}>
          <Typography
            variant="h6"
            component="div"
            height={32}
            noWrap
            color={isError ? "error" : "-moz-initial"}
          >
            {campaign.name}
          </Typography>
        </Tooltip>
        <Tooltip title={`Advertisements: ${caculateAds(campaign.ads)}`}>
          <Typography variant="body2">
            Advertisements: {caculateAds(campaign.ads)}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={subCampaignsData.length <= 1}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteSubCampaign(campaign);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubCampaignCard;
