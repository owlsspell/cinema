import {  Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

 const ShowSnackbar = ({ severity, message,openSnackbar,setOpenSnackbar }) => {
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setOpenSnackbar(false);
      };

    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      
    );
  };

   export default ShowSnackbar
