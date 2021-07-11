import React, { useState } from 'react';

import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import useStyles from './styles';
import { axiosInstance } from "../../../client";
import { useHistory } from "react-router";
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../../Auth/Login';
import LoadingSpinner from '../../Utils/LoadingSpinner';

const Create = () => {
    const classes = useStyles();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { isAuthenticated, user, isLoading } = useAuth0();
    const handleSubmit = async(e) => {
        e.preventDefault();
        setTitleError(false);
        setDescriptionError(false);

        if(title === '')
            setTitleError(true);
        if(description === '')
            setDescriptionError(true);

        if(title && description) {
            setTitle('');
            setDescription('');
            setPriority('medium');
            try {
                setSubmitting(true);
                await axiosInstance.post('/issues', {
                    title,
                    description,
                    author: user.given_name,
                    priority: priority.charAt(0).toUpperCase() + priority.substring(1),
                    authorEmail: user.email,
                    authorPicture: user.picture,
                });
                setSubmitting(false);
                alert("The issue has been added.");
                history.push('/');
            } catch(e) {
                console.log(e.message);
                alert('Failed adding new issue. Try again later.')
                setSubmitting(false);
            }
        }
    }

    return (
        submitting ? <LoadingSpinner>Submitting issue..</LoadingSpinner>
            : isLoading ? <LoadingSpinner/> : !isAuthenticated ? <Login/> :
            <Container>
                <Typography
                    variant='h6'
                    component="h2"
                    color='primary'
                    gutterBottom
                >
                    Create a New Case
                </Typography>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        className={classes.field}
                        onChange={(e) => setTitle(e.target.value)}
                        label='Title'
                        variant='outlined'
                        value={title}
                        fullWidth
                        required
                        error={titleError}
                    />
                    <TextField
                        className={classes.field}
                        onChange={(e) => setDescription(e.target.value)}
                        label='Description'
                        variant='outlined'
                        value={description}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        error={descriptionError}
                    />

                    <FormControl className={classes.field}>
                        <FormLabel>Priority Level</FormLabel>
                        <RadioGroup row value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <FormControlLabel value='low' control={<Radio/>} label='Low'/>
                            <FormControlLabel value='medium' control={<Radio/>} label='Medium'/>
                            <FormControlLabel value='high' control={<Radio/>} label='High'/>
                        </RadioGroup>
                    </FormControl>

                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        endIcon={<KeyboardArrowRightIcon/>}
                        // onClick={() => alert('idiot')}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
    );
};

export default Create;
