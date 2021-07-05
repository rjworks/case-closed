import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import useStyles from './styles';

const Create = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
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
            alert("Issue added!")
        }
    }
    return (
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
