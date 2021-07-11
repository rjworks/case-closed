import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => (
    {
        root: {
            display: 'flex'
        },
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        active: {
            background: '#f4f4f4'
        },
        titleContainer: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        title: {
            marginLeft: theme.spacing(1.5)
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: '#fff',
            color: 'black'
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
            alignItems: 'center'
        },
        avatar: {
            marginLeft: theme.spacing(2),
            height: theme.spacing(5),
            width: theme.spacing(5),
        },
        logo: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            // marginLeft: '2px'
        }
    }
));