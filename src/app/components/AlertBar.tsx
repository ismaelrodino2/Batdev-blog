import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Modal,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { State } from "./Account";

type PropTypes = {
  setOpen: (value: boolean) => void;
  message: string;
  severity: AlertColor | undefined;
  open: boolean;
};

export const AlertBar = ({
  setOpen,
  message,
  severity,
  open,
}: PropTypes) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const state:State={
    open: false,
    vertical: "bottom",
    horizontal: "right",
  }

  const { vertical, horizontal } = state;

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
