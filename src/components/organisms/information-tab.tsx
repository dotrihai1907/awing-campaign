import { Stack, TextField } from "@mui/material";
import {
  CampaignDataType,
  CampaignInformationType,
  ErrorListType,
} from "./campaign.model";
import { useMemo } from "react";

export type InformationTabType = {
  errorList: ErrorListType | null;
  informationData: CampaignInformationType;
  setData: React.Dispatch<React.SetStateAction<CampaignDataType>>;
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>;
};

const InformationTab = (props: InformationTabType) => {
  const { setData, setErrorList, errorList, informationData } = props;
  const { name, describe } = informationData;

  const isError = useMemo(() => {
    return Boolean(errorList?.information.isError);
  }, [errorList]);

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "name" | "describe"
  ) => {
    setData((prev) => ({
      campaign: {
        ...prev.campaign,
        information: {
          ...prev.campaign.information,
          [field]: event.target.value,
        },
      },
    }));
    field === "name" &&
      event.target.value &&
      setErrorList((prev) =>
        prev ? { ...prev, information: { isError: false } } : null
      );
  };

  return (
    <Stack spacing={1.5}>
      <TextField
        placeholder="Campaign name"
        label="Campaign name"
        variant="standard"
        fullWidth
        required
        error={isError}
        value={name}
        onChange={(event) => handleChangeTextField(event, "name")}
        helperText={isError && "This field is required"}
      />
      <TextField
        placeholder="Description"
        label="Description"
        variant="standard"
        fullWidth
        value={describe}
        onChange={(event) => handleChangeTextField(event, "describe")}
      />
    </Stack>
  );
};

export default InformationTab;
