import {
  CampaignAdsType,
  CampaignDataType,
  ErrorListType,
  SubCampaignsType,
} from "./campaign.model";

export const uniqId = (prefix = "") => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${randomNum}`;
};

export const getInitDataWithUniqId = (initData: CampaignDataType) => ({
  campaign: {
    ...initData.campaign,
    subCampaigns: initData.campaign.subCampaigns.map((sub) => ({
      ...sub,
      uniqId: uniqId("sub_"),
      ads: sub.ads.map((ad) => ({ ...ad, uniqId: uniqId("ad_") })),
    })),
  },
});

export const addSubCampaign = (
  setData: (value: React.SetStateAction<CampaignDataType>) => void
) => {
  setData((prev) => {
    const newSubCampaigns = [
      ...prev.campaign.subCampaigns,
      {
        uniqId: uniqId("sub_"),
        name: `Sub-campaign ${prev.campaign.subCampaigns.length + 1}`,
        status: true,
        ads: [
          {
            uniqId: uniqId("ad_"),
            name: "Advertisement 1",
            quantity: 1,
          },
        ],
      },
    ];
    return {
      campaign: {
        ...prev.campaign,
        subCampaigns: newSubCampaigns,
      },
    };
  });
};

export const caculateAds = (ads: CampaignAdsType[]) =>
  ads.reduce((state, current) => state + (current.quantity ?? 0), 0);

export const deleteSubCampaign = (
  selectSub: SubCampaignsType,
  activeSub: SubCampaignsType,
  subCampaignsData: SubCampaignsType[],
  setData: (value: React.SetStateAction<CampaignDataType>) => void,
  setActiveSub: React.Dispatch<React.SetStateAction<SubCampaignsType>>
) => {
  const isClickActive = selectSub.uniqId === activeSub.uniqId;
  const selectIndex = subCampaignsData.findIndex(
    (sub) => sub.uniqId === selectSub.uniqId
  );

  if (isClickActive) {
    if (selectIndex !== subCampaignsData.length - 1) {
      setActiveSub(subCampaignsData[selectIndex + 1]);
    } else {
      setActiveSub(subCampaignsData[selectIndex - 1]);
    }
  }

  setData((prev) => {
    const newSubCampaigns = prev.campaign.subCampaigns.filter(
      (sub) => sub.uniqId !== selectSub.uniqId
    );
    return {
      campaign: {
        ...prev.campaign,
        subCampaigns: newSubCampaigns,
      },
    };
  });
};

export const deleteAds = (
  selected: string[],
  activeSub: SubCampaignsType,
  setData: (value: React.SetStateAction<CampaignDataType>) => void,
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>
) => {
  setData((prev) => {
    const newSubCampaigns = [...prev.campaign.subCampaigns];
    const subCampaignIndex = newSubCampaigns.findIndex(
      (sub) => sub.uniqId === activeSub.uniqId
    );
    const restAds = activeSub.ads.filter(
      (ad) => !selected.includes(ad.uniqId ?? "")
    );
    newSubCampaigns[subCampaignIndex].ads = restAds;
    return {
      campaign: {
        ...prev.campaign,
        subCampaigns: newSubCampaigns,
      },
    };
  });
  setSelected([]);
  setErrorList((prev) => {
    if (prev) {
      const newSubErrors = [...prev.subCampaigns];
      const subCampaignIndex = newSubErrors.findIndex(
        (error) => error.uniqId === activeSub.uniqId
      );
      if (subCampaignIndex !== -1) {
        const restAdError = newSubErrors[subCampaignIndex].ads.filter(
          (ad) => !selected.includes(ad.uniqId ?? "")
        );
        newSubErrors[subCampaignIndex].ads = restAdError;
      }
      return { ...prev, subCampaigns: newSubErrors };
    } else return null;
  });
};

export const selectAllAds = (
  checked: boolean,
  activeSub: SubCampaignsType,
  setSelected: (value: React.SetStateAction<string[]>) => void
) => {
  if (checked) {
    const newSelected = activeSub.ads.map((ad) => ad.uniqId ?? "");
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

export const addNewAd = (
  activeSub: SubCampaignsType,
  setData: (value: React.SetStateAction<CampaignDataType>) => void
) => {
  setData((prev) => {
    const newSubCampaigns = [...prev.campaign.subCampaigns];
    const subCampaignIndex = newSubCampaigns.findIndex(
      (sub) => sub.uniqId === activeSub.uniqId
    );
    const newAds = [
      ...activeSub.ads,
      {
        uniqId: uniqId("ad_"),
        name: `Advertisement ${activeSub.ads.length + 1}`,
        quantity: 1,
      },
    ];
    newSubCampaigns[subCampaignIndex].ads = newAds;
    return {
      campaign: {
        ...prev.campaign,
        subCampaigns: newSubCampaigns,
      },
    };
  });
};

export const deleteAd = (
  delAd: CampaignAdsType,
  activeSub: SubCampaignsType,
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  setData: (value: React.SetStateAction<CampaignDataType>) => void,
  setErrorList: React.Dispatch<React.SetStateAction<ErrorListType | null>>
) => {
  setData((prev) => {
    const newSubCampaigns = [...prev.campaign.subCampaigns];
    const subCampaignIndex = newSubCampaigns.findIndex(
      (sub) => sub.uniqId === activeSub.uniqId
    );
    const restAds = activeSub.ads.filter((ad) => ad.uniqId !== delAd.uniqId);
    newSubCampaigns[subCampaignIndex].ads = restAds;
    return {
      campaign: {
        ...prev.campaign,
        subCampaigns: newSubCampaigns,
      },
    };
  });
  setSelected((prev) => {
    const newSelected = [...prev];
    const filterSelected = newSelected.filter((el) => el !== delAd.uniqId);
    return filterSelected;
  });
  setErrorList((prev) => {
    if (prev) {
      const newSubErrors = [...prev.subCampaigns];
      const subCampaignIndex = newSubErrors.findIndex(
        (error) => error.uniqId === activeSub.uniqId
      );
      if (subCampaignIndex !== -1) {
        const restAdError = newSubErrors[subCampaignIndex].ads.filter(
          (ad) => ad.uniqId !== delAd.uniqId
        );
        newSubErrors[subCampaignIndex].ads = restAdError;
      }
      return { ...prev, subCampaigns: newSubErrors };
    } else return null;
  });
};

export const validateAfterSubmit = (errorList: ErrorListType) => {
  if (errorList.information.isError) return false;
  const isExistedSubError = errorList.subCampaigns.some((sub) => sub.isError);
  if (isExistedSubError) return false;
  const isExistedAdError = errorList.subCampaigns.some((sub) => {
    return sub.ads.some((ad) => ad.isError);
  });
  if (isExistedAdError) return false;
  return true;
};
