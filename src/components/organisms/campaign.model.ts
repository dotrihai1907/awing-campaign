export type CampaignInformationType = {
  name: string;
  describe?: string;
};

export type CampaignAdsType = {
  uniqId?: string;
  name: string;
  quantity: number | null;
};

export type SubCampaignsType = {
  uniqId?: string;
  name: string;
  status: boolean;
  ads: CampaignAdsType[];
};

export type CampaignDataType = {
  campaign: {
    information: CampaignInformationType;
    subCampaigns: SubCampaignsType[];
  };
};

export type IsError = {
  uniqId?: string;
  isError: boolean;
  isNumberic?: boolean;
};

export type SubCampaignsError = {
  ads: IsError[];
} & IsError;

export type ErrorListType = {
  information: IsError;
  subCampaigns: SubCampaignsError[];
};
