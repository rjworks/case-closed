import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../client';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Avatar, Card, CardContent, CardHeader, Container, Grid, IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import useStyles from './styles';

const Home = () => {
    const history = useHistory();
    const classes = useStyles();
    const { user } = useAuth0();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async() => {
            const { data } = await axiosInstance.get('/issues');
            setData(data.data);
        }
        getData();
    }, []);

    useEffect(() => {
        if(data !== null) {
            setLoading(false);
        }
    }, [data]);

    return (
        loading ? <LoadingSpinner/> :
            <Container>
                <Grid container spacing={3}>
                    {data.map((issue, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                            <Card elevation={1} className={classes.card}>
                                <CardHeader
                                    action={
                                        <IconButton onClick={() => history.push(`/issues/${issue._id}`)}>
                                            <ChevronRightIcon/>
                                        </IconButton>
                                    }
                                    title={issue.title}
                                    subheader={`${issue.author} | ${issue.priority}`}
                                    avatar={
                                        <Avatar alt='avatar'
                                                src={user.picture || 'https://cdn.dribbble.com/users/6000583/screenshots/14453387/shot-cropped-1603613998514.png?compress=1&resize=400x300'}/>
                                    }
                                />
                                <CardContent>
                                    <Typography variant='body2' color='textSecondary'>
                                        {issue.description.length > 130 ? issue.description.substring(0, 130) + '...' : issue.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/*<button onClick={() => logout()}>logout</button>*/}
            </Container>
    );
};

export default Home;
