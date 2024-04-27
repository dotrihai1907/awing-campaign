import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

export type AdsTableToolbarType = {
  rowCount: number;
  numSelected: number;
  handleDeleteAds: () => void;
};

const AdsTableToolbar = (props: AdsTableToolbarType) => {
  const { rowCount, numSelected, handleDeleteAds } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        ...(numSelected > 0 && { bgcolor: "#1976d20a" }),
        ...(rowCount < 3 ? { pr: { xs: 2, sm: 2 } } : { pr: { xs: 4, sm: 4 } }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} fontSize={14}>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography fontSize={16}>LIST OF ADVERTISEMENTS</Typography>
      )}
      {numSelected > 0 && (
        <IconButton
          size="small"
          onClick={handleDeleteAds}
          disabled={rowCount < 2}
        >
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      )}
    </Toolbar>
  );
};

export default AdsTableToolbar;
