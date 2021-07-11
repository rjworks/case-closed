import React, { useEffect } from 'react';
import {
    Backdrop,
    Button,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Fade,
    makeStyles,
    Modal, Slide,
    Typography
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(!isLoading)
            setOpen(!isAuthenticated);
    }, [isAuthenticated]);

    return (
        !isAuthenticated && (
            <div>
                <Dialog
                    open={open}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Case Closed Authentication
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Normally, only authorized users would be allowed into the dashboard,
                            but since you're awesome, you can get through by simply logging in with
                            your Google account!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose();
                            loginWithRedirect();
                        }} size='medium' variant='contained' color="primary">
                            Log in
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    );
};

export default Login;
