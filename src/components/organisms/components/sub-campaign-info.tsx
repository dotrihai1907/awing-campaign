import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import {
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "../campaign.model";

export type SubCampaignInfoType = {
  activeSub: SubCampaignsType;
  errorList: ErrorListType | null;
  setData: (value: React.SetStateAction<CampaignDataType>) => void;
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>;
};

const SubCampaignInfo = (props: SubCampaignInfoType) => {
  const { activeSub, setData, errorList, setErrorList } = props;

  const isError = useMemo(() => {
    if (errorList) {
      const campaignIndex = errorList.subCampaigns.findIndex(
        (error) => error.uniqId === activeSub.uniqId
      );
      if (campaignIndex === -1) return false;
      return errorList.subCampaigns[campaignIndex].isError;
    } else return false;
  }, [activeSub.uniqId, errorList]);

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => {
      const newSubCampaign = [...prev.campaign.subCampaigns];
      const selectIndex = newSubCampaign.findIndex(
        (sub) => sub.uniqId === activeSub.uniqId
      );
      newSubCampaign[selectIndex].name = event.target.value;
      return {
        campaign: {
          ...prev.campaign,
          subCampaigns: newSubCampaign,
        },
      };
    });
    event.target.value &&
      setErrorList((prev) => {
        if (prev) {
          const newSubErrors = [...prev.subCampaigns];
          const selectedIndex = newSubErrors.findIndex(
            (error) => error.uniqId === activeSub.uniqId
          );
          if (selectedIndex !== -1) {
            newSubErrors[selectedIndex].isError = false;
          }
          return { ...prev, subCampaigns: newSubErrors };
        } else return null;
      });
  };

  const handleChangeCheckbox = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setData((prev) => {
      const newSubCampaign = [...prev.campaign.subCampaigns];
      const selectIndex = newSubCampaign.findIndex(
        (sub) => sub.uniqId === activeSub.uniqId
      );
      newSubCampaign[selectIndex].status = checked;
      return {
        campaign: {
          ...prev.campaign,
          subCampaigns: newSubCampaign,
        },
      };
    });
  };

  return (
    <Stack borderTop="1px solid #0000001f" paddingTop={3} spacing={1.5}>
      <Typography noWrap>SUB-CAMPAIGN INFORMATION</Typography>
      <Stack direction="row">
        <TextField
          placeholder="Sub-campaign name"
          label="Sub-campaign name"
          variant="standard"
          fullWidth
          required
          error={isError}
          value={activeSub.name}
          onChange={handleChangeTextField}
          helperText={isError && "This field is required"}
        />
        <FormControlLabel
          label="Active status"
          sx={{ width: "200px", justifyContent: "flex-end" }}
          control={
            <Checkbox
              color="success"
              checked={activeSub.status}
              onChange={handleChangeCheckbox}
              checkedIcon={<CheckCircleIcon />}
              icon={<CheckCircleOutlineIcon />}
            />
          }
        />
      </Stack>
    </Stack>
  );
};

export default SubCampaignInfo;
