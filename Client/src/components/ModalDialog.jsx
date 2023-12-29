/* eslint-disable no-unused-vars */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import CommonForm from "./CommonForm";

const ModalDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <CommonForm handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;



