import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../client';
import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

const Issue = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth0();

    useEffect(() => {
        const getData = async() => {
            const { data } = await axiosInstance.get(`/issues/${params.id}`)
            setData(data.data[0]);
        }
        getData();

    }, [params.id])

    useEffect(() => {
        if(data !== null)
            setLoading(false);
    }, [data]);

    const deleteIssue = async(id) => {
        try{
            await axiosInstance.delete(`/issues/${id}`);
            history.push('/');
            alert('The issue has been deleted.');
        }catch(e){
            console.log(e.message)
            alert('There was an error deleting the issue.');
        }
    }

    return (
        loading ? <LoadingSpinner/> :
            <Card className={classes.root}>
                <CardHeader
                    action={
                        data.authorEmail === user.email ? <IconButton onClick={() => {
                            deleteIssue(data._id);
                        }}>
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
