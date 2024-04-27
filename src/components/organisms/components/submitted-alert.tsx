import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { validateAfterSubmit } from "../campaign.util";
import { ErrorListType } from "../campaign.model";

export type SubmittedAlertType = {
  openAlert: boolean;
  errorList: ErrorListType | null;
  handleCloseAlert: (
    _event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void;
};

const SubmittedAlert = (props: SubmittedAlertType) => {
  const { errorList, openAlert, handleCloseAlert } = props;
  return (
    <>
      {errorList && (
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="outlined"
            sx={{ width: "100%" }}
            severity={validateAfterSubmit(errorList) ? "success" : "error"}
            children={
              validateAfterSubmit(errorList)
                ? "You have submitted the campaign successfully."
                : "An error occurred. Please fill in all required information correctly and completely."
            }
          />
        </Snackbar>
      )}
    </>
  );
};

export default SubmittedAlert;
