import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/HooksForState';
import { setErrorApp } from '../../state_manager/reducers/app_reducer';
import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()




    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorApp({ error: null }))
    };


    return (
        <Snackbar open={error && error.length > 1 && !null ? true : false} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: 'center' }} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.50)' }}>
                {error}
            </Alert>
        </Snackbar>
    );
}