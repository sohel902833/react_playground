import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
  positiveButtonText?: string;
  negativeButtonText?: string;
  actionLoading?: boolean;
  actionHandler: any;
  actionLoadingText?: string;
}
const ActionModal = ({
  title,
  message,
  open,
  setOpen,
  positiveButtonText = "Yes",
  negativeButtonText = "Cancel",
  actionLoading,
  actionHandler,
}: Props) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      PaperProps={{ style: { borderRadius: 16 } }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="max-width-dialog-title" style={{ paddingBottom: 0 }}>
        <strong>{title}</strong>
      </DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions style={{ margin: "15px" }}>
        <Button
          variant="contained"
          disableElevation
          style={{
            borderRadius: "9px",
            height: "40px",
            width: "100%",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
          onClick={() => setOpen(false)}
        >
          {negativeButtonText}
        </Button>
        <Button
          onClick={actionHandler}
          disabled={actionLoading}
          variant="contained"
          disableElevation
          style={{
            borderRadius: "9px",
            height: "40px",
            width: "100%",
            background: "#EB9E00",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {actionLoading ? <CircularProgress size={20} /> : positiveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
