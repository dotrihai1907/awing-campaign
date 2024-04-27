import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Link } from "@mui/material";

const CampaignHeader = () => {
  return (
    <Breadcrumbs>
      <Link
        sx={{ display: "flex", alignItems: "center" }}
        underline="hover"
        color="inherit"
        href="/"
      >
        <HomeIcon fontSize="small" />
      </Link>
      <Link underline="hover" color="inherit" href="/">
        Campaign
      </Link>
      <Link underline="hover" color="primary" href="/">
        Register
      </Link>
    </Breadcrumbs>
  );
};

export default CampaignHeader;
