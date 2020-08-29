import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import React from "react";

const InfoSnackbar = ({isOpen, onClose, label}) => {
    return <Snackbar open={isOpen} message={label} anchorOrigin={{vertical: "bottom", horizontal: "right"}} autoHideDuration={3000} onClose={onClose}/>
}

export default InfoSnackbar
