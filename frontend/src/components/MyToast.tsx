import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export interface Props {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: 'success' | 'error';
}
const MyToast: React.FC<Props> = ({
  vertical,
  horizontal,
  open,
  handleClose,
  message,
  severity,
}) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyToast;
