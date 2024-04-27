import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

export type AdsTableHeaderType = {
  rowCount: number;
  numSelected: number;
  handleAddNew: () => void;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdsTableHeader = (props: AdsTableHeaderType) => {
  const { numSelected, rowCount, handleAddNew, handleSelectAll } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAll}
          />
        </TableCell>
        <TableCell sx={{ fontSize: "16px" }}>Advertising name *</TableCell>
        <TableCell sx={{ fontSize: "16px" }}>Quantity *</TableCell>
        <TableCell align="right">
          <Tooltip title="Add">
            <IconButton size="small" onClick={handleAddNew}>
              <PlaylistAddIcon color="primary" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default AdsTableHeader;
