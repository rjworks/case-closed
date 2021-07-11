import React from 'react';
import {
    AppBar,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import Login from '../Auth/Login';
import logo from '../../assets/logo.png';

const menuItems = [
    {
        text: 'Home',
        icon: <HomeIcon color='secondary'/>,
        path: '/'
    },
    {
        text: 'Create Issue',
        icon: <AddCircleOutlineOutlined color='secondary'/>,
        path: '/create'
    },
    {
        text: 'Log out',
        icon: <ExitToAppIcon color='secondary'/>,
        path: '/logout'
    }
];

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { user, isLoading, isAuthenticated, logout } = useAuth0();
    return (
        isLoading ? <LoadingSpinner/> : isAuthenticated ?
            <div className={classes.root}>
                <AppBar
                    className={classes.appBar}
                    elevation={0}
                >
                    <Toolbar>
                        <Typography variant='body1' className={classes.date}>
                            Today is {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        </Typography>
                        <Typography variant='h5'>
                            {user.given_name}
                        </Typography>
                        <Avatar alt='avatar' src={user.picture} className={classes.avatar}/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='permanent'
                    anchor='left'
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div className={classes.titleContainer} onClick={() => history.push('/')}>
                        <Avatar className={classes.logo} alt='logo' src={logo}/>
                        <Typography variant='h5' className={classes.title}>
                            Case Closed
                        </Typography>
                    </div>
                    <List>
                        {menuItems.map((item, i) => (
                            <ListItem
                                button
                                key={i}
                                onClick={() => item.path === '/logout' ? logout() : history.push(item.path)}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className={classes.page}>
                    <div className={classes.toolbar}/>
                    {children}
                </div>
            </div> : <Login/>

    );
};

export default Layout;
