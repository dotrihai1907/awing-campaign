import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  Input,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  CampaignAdsType,
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "../../campaign.model";
import { deleteAd } from "../../campaign.util";
import AdsNummberInput from "./ads-number-input";

export type AdsTableBodyType = {
  selected: string[];
  activeSub: SubCampaignsType;
  errorList: ErrorListType | null;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setData: (value: React.SetStateAction<CampaignDataType>) => void;
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>;
};

const AdsTableBody = (props: AdsTableBodyType) => {
  const { setData, selected, activeSub, setSelected, errorList, setErrorList } =
    props;

  const isSelected = (uniqId: string) => selected.indexOf(uniqId) !== -1;

  const checkIsNameError = (ad: CampaignAdsType) => {
    if (errorList) {
      const subCampaignIndex = errorList.subCampaigns.findIndex(
        (error) => error?.uniqId === activeSub?.uniqId
      );
      if (subCampaignIndex === -1) return false;
      const adNameErrorIndex = errorList.subCampaigns[
        subCampaignIndex
      ].ads.findIndex((el) => el.uniqId === ad.uniqId && !el.isNumberic);
      if (adNameErrorIndex !== -1) {
        return errorList.subCampaigns[subCampaignIndex].ads[adNameErrorIndex]
          .isError;
      } else return false;
    } else return false;
  };

  const checkIsQuantityError = (ad: CampaignAdsType) => {
    if (errorList) {
      const subCampaignIndex = errorList.subCampaigns.findIndex(
        (error) => error.uniqId === activeSub.uniqId
      );
      if (subCampaignIndex === -1) return false;
      const adQuantityErrorIndex = errorList.subCampaigns[
        subCampaignIndex
      ].ads.findIndex((el) => el.uniqId === ad.uniqId && el.isNumberic);
      if (adQuantityErrorIndex !== -1) {
        return errorList.subCampaigns[subCampaignIndex].ads[
          adQuantityErrorIndex
        ].isError;
      } else return false;
    } else return false;
  };

  const handleChangeCheckbox = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    uniqId: string
  ) => {
    const selectedIndex = selected.indexOf(uniqId);
    if (selectedIndex !== -1) {
    }
    if (checked) {
      setSelected((prev) => [...prev, uniqId]);
    } else {
      setSelected((prev) => {
        const newSelected = [...prev].filter((select) => select !== uniqId);
        return newSelected;
      });
    }
  };

  const handleChangeInputName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ad: CampaignAdsType
  ) => {
    setData((prev) => {
      const newSubCampaigns = [...prev.campaign.subCampaigns];
      const subCampaignIndex = newSubCampaigns.findIndex(
        (sub) => sub.uniqId === activeSub.uniqId
      );
      const adIndex = activeSub.ads.findIndex((el) => el.uniqId === ad.uniqId);
      newSubCampaigns[subCampaignIndex].ads[adIndex].name = event.target.value;
      return {
        campaign: {
          ...prev.campaign,
          subCampaigns: newSubCampaigns,
        },
      };
    });
    event.target.value &&
      setErrorList((prev) => {
        if (prev) {
          const newSubErrors = [...prev.subCampaigns];
          const subCampaignIndex = newSubErrors.findIndex(
            (error) => error.uniqId === activeSub.uniqId
          );
          if (subCampaignIndex !== -1) {
            const adNameErrorIndex = newSubErrors[
              subCampaignIndex
            ].ads.findIndex((el) => el.uniqId === ad.uniqId && !el.isNumberic);
            if (adNameErrorIndex !== -1) {
              newSubErrors[subCampaignIndex].ads[adNameErrorIndex].isError =
                false;
            }
          }
          return { ...prev, subCampaigns: newSubErrors };
        } else return null;
      });
  };

  const handleChangeInputQuantity = (
    value: number | null,
    ad: CampaignAdsType
  ) => {
    setData((prev) => {
      const newSubCampaigns = [...prev.campaign.subCampaigns];
      const subCampaignIndex = newSubCampaigns.findIndex(
        (sub) => sub.uniqId === activeSub.uniqId
      );
      const adIndex = activeSub.ads.findIndex((el) => el.uniqId === ad.uniqId);
      newSubCampaigns[subCampaignIndex].ads[adIndex].quantity = value;
      return {
        campaign: {
          ...prev.campaign,
          subCampaigns: newSubCampaigns,
        },
      };
    });
    value &&
      setErrorList((prev) => {
        if (prev) {
          const newSubErrors = [...prev.subCampaigns];
          const subCampaignIndex = newSubErrors.findIndex(
            (error) => error.uniqId === activeSub.uniqId
          );
          if (subCampaignIndex !== -1) {
            const adQuantityErrorIndex = newSubErrors[
              subCampaignIndex
            ].ads.findIndex((el) => el.uniqId === ad.uniqId && el.isNumberic);
            if (adQuantityErrorIndex !== -1) {
              newSubErrors[subCampaignIndex].ads[adQuantityErrorIndex].isError =
                false;
            }
          }
          return { ...prev, subCampaigns: newSubErrors };
        } else return null;
      });
  };

  const handleDeleteAd = (delAd: CampaignAdsType) => {
    deleteAd(delAd, activeSub, setSelected, setData, setErrorList);
  };

  return (
    <TableBody>
      {activeSub.ads.map((ad) => {
        const isItemSelected = isSelected(ad.uniqId ?? "");
        return (
          <TableRow className={ad.uniqId} key={ad.uniqId}>
            <TableCell padding="checkbox">
              <Checkbox
                size="small"
                color="primary"
                checked={isItemSelected}
                onChange={(event, checked) =>
                  handleChangeCheckbox(event, checked, ad.uniqId ?? "")
                }
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Advertising name"
                fullWidth
                required
                error={checkIsNameError(ad)}
                value={ad.name}
                onChange={(event) => handleChangeInputName(event, ad)}
                sx={{ fontSize: "14px" }}
              />
            </TableCell>
            <TableCell>
              <AdsNummberInput
                placeholder="Quantity"
                value={ad.quantity}
                required
                error={checkIsQuantityError(ad)}
                onChange={(_event, value) =>
                  handleChangeInputQuantity(value, ad)
                }
              />
            </TableCell>
            <TableCell align="right">
              <IconButton
                size="small"
                onClick={() => handleDeleteAd(ad)}
                disabled={activeSub.ads.length < 2}
              >
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default AdsTableBody;
