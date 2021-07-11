import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../client';
import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { useAuth0 } from '@auth0/auth0-react';

const Issue = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const classes = useStyles();
    const { user } = useAuth0();

    useEffect(() => {
        const getData = async() => {
            const { data } = await axiosInstance.get(`/issues/${params.id}`)
            setData(data.data[0]);
        }
        getData();

    }, [])

    useEffect(() => {
        if(data !== null)
            setLoading(false);
    }, [data]);

    return (
        loading ? <LoadingSpinner/> :
            <Card className={classes.root}>
                <CardHeader
                    action={
                        data.authorEmail === user.email ? <IconButton>
                            <DeleteIcon/>
                        </IconButton> : null
                    }
                    title={data.title}
                    subheader={
                        <Typography variant="body1" color='textSecondary'>
                            {data.description}
                        </Typography>
                    }
                />
                <CardContent>
                    <Divider/>
                    <div className={classes.spacing}/>
                    <Typography color="textSecondary">
                        Author: {data.authorEmail === user.email ? 'You' : data.author}
                    </Typography>
                    <Typography color="textSecondary">
                        Priority: {data.priority}
                    </Typography>
                </CardContent>
            </Card>
    );
};

export default Issue;
