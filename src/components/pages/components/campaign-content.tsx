import {
  Box,
  Button,
  Paper,
  SnackbarCloseReason,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import {
  CampaignDataType,
  ErrorListType,
  IsError,
  SubCampaignsError,
} from "../../organisms/campaign.model";
import { getInitDataWithUniqId } from "../../organisms/campaign.util";
import SubmittedAlert from "../../organisms/components/submitted-alert";
import InformationTab from "../../organisms/information-tab";
import SubCampaignsTab from "../../organisms/sub-campaigns-tab";
import {
  INIT_CAMPAIGN_DATA,
  INIT_ERROR_LIST,
  TAB_VALUE,
} from "../campaign.constant";

const { INFORMATION, SUB_CAMPAIGNS } = TAB_VALUE;

const CampaignContent = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>(INFORMATION);
  const [errorList, setErrorList] = useState<ErrorListType | null>(null);
  const [data, setData] = useState<CampaignDataType>(() =>
    getInitDataWithUniqId(INIT_CAMPAIGN_DATA)
  );

  const { information, subCampaigns } = data.campaign;

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue.toString());
  };

  const handleSubmit = () => {
    let newErrors = INIT_ERROR_LIST;
    if (!data.campaign.information.name) {
      newErrors = { ...newErrors, information: { isError: true } };
    }
    const subCampaignErrors: SubCampaignsError[] =
      data.campaign.subCampaigns.map((sub) => {
        const adNameErrors: IsError[] = sub.ads.map((el) => ({
          isError: !el.name,
          uniqId: el.uniqId,
        }));

        const adQuantityErrors: IsError[] = sub.ads.map((el) => ({
          isError: el.quantity ? el.quantity < 1 : true,
          isNumberic: true,
          uniqId: el.uniqId,
        }));
        return {
          isError: !sub.name,
          uniqId: sub.uniqId,
          ads: [...adNameErrors, ...adQuantityErrors],
        };
      });
    newErrors = { ...newErrors, subCampaigns: subCampaignErrors };
    setErrorList(newErrors);
    setOpenAlert(true);
  };

  const handleCloseAlert = (
    _event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      setOpenAlert(false);
    }
    setOpenAlert(false);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "750px",
      }}
    >
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs onChange={handleChangeTab} value={tabValue}>
            <Tab value={INFORMATION} label="Information" />
            <Tab value={SUB_CAMPAIGNS} label="Sub-campaigns" />
          </Tabs>
        </Box>
        <Box display={tabValue === INFORMATION ? "block" : "none"} padding={3}>
          <InformationTab
            errorList={errorList}
            informationData={information}
            setErrorList={setErrorList}
            setData={setData}
          />
        </Box>
        <Box display={tabValue !== INFORMATION ? "block" : "none"} padding={3}>
          <SubCampaignsTab
            errorList={errorList}
            setData={setData}
            setErrorList={setErrorList}
            subCampaignsData={subCampaigns}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        paddingBottom={3}
        paddingRight={3}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100px" }}
        >
          Submit
        </Button>
      </Box>
      <SubmittedAlert
        openAlert={openAlert}
        errorList={errorList}
        handleCloseAlert={handleCloseAlert}
      />
    </Paper>
  );
};

export default CampaignContent;
