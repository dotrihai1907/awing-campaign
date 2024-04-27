import { Box, Paper, Table, TableContainer } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import {
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "../campaign.model";
import { addNewAd, deleteAds, selectAllAds } from "../campaign.util";
import AdsTableBody from "./ads-components/ads-table-body";
import AdsTableHeader from "./ads-components/ads-table-header";
import AdsTableToolbar from "./ads-components/ads-table-toolbar";

export type AdsCampaignInfoType = {
  activeSub: SubCampaignsType;
  errorList: ErrorListType | null;
  setData: (value: React.SetStateAction<CampaignDataType>) => void;
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>;
};

const AdsCampaignInfo = (props: AdsCampaignInfoType) => {
  const { activeSub, setData, errorList, setErrorList } = props;

  const isAddRef = useRef<boolean>(false);

  const [selected, setSelected] = useState<string[]>([]);

  const handleDeleteAds = () => {
    deleteAds(selected, activeSub, setData, setSelected, setErrorList);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectAllAds(event.target.checked, activeSub, setSelected);
  };

  const handleAddNew = () => {
    addNewAd(activeSub, setData);
    isAddRef.current = true;
  };

  useLayoutEffect(() => {
    if (isAddRef.current) {
      isAddRef.current = false;
      document
        .querySelector(`.${activeSub.ads[activeSub.ads.length - 1].uniqId}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSub.ads]);

  return (
    <Paper sx={{ width: "100%", maxHeight: "280px" }}>
      <AdsTableToolbar
        numSelected={selected.length}
        rowCount={activeSub.ads.length}
        handleDeleteAds={handleDeleteAds}
      />
      <TableContainer sx={{ maxHeight: "216px" }}>
        <Table stickyHeader>
          <AdsTableHeader
            numSelected={selected.length}
            rowCount={activeSub.ads.length}
            handleAddNew={handleAddNew}
            handleSelectAll={handleSelectAll}
          />
          <AdsTableBody
            selected={selected}
            activeSub={activeSub}
            setData={setData}
            setSelected={setSelected}
            errorList={errorList}
            setErrorList={setErrorList}
          />
        </Table>
        <Box id="auto-scroll" />
      </TableContainer>
    </Paper>
  );
};

export default AdsCampaignInfo;
