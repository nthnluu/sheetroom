import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import React from "react";

const SuccessSnackbar = ({isOpen, onClose, label}) => {
    return <Snackbar open={isOpen} anchorOrigin={{vertical: "bottom", horizontal: "right"}} autoHideDuration={3000} onClose={onClose}>
        <Alert severity="success">
            {label}
        </Alert>
    </Snackbar>
}

export default SuccessSnackbar
