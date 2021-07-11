import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center'
    }
}));

export default function LoadingSpinner(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress/>
            {props.children}
        </div>
    );
}