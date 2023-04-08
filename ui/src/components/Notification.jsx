import React, {useEffect} from 'react';
import {Snackbar, Alert} from '@mui/material';

const Notification = (props) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        props.setNotification({});
    };
    useEffect(() => {
      console.log('not',props.notification,Object.keys(props.notification).length===0)
    },[props.notification]);
    return  (
        <Snackbar open={Object.keys(props.notification).length===0?false:true} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.notification?.type} sx={{ width: '100%' }}>
          {props.notification?.message}
        </Alert>
      </Snackbar>
    )
}
export default Notification;