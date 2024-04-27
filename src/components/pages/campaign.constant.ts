import { CampaignDataType, ErrorListType } from "../organisms/campaign.model";

export const INIT_CAMPAIGN_DATA: CampaignDataType = {
  campaign: {
    information: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        name: "Sub-campaign 1",
        status: true,
        ads: [
          {
            name: "Advertisement 1",
            quantity: 1,
          },
        ],
      },
    ],
  },
};

export const TAB_VALUE = {
  INFORMATION: "1",
  SUB_CAMPAIGNS: "2",
};

export const INIT_ERROR_LIST: ErrorListType = {
  information: { isError: false },
  subCampaigns: [{ isError: false, ads: [{ isError: false }] }],
};
