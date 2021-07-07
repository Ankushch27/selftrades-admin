import { Box, Button, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactsIcon from '@material-ui/icons/Contacts';
import MenuIcon from '@material-ui/icons/Menu';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { logout, saveUser } from '../actions/authActions';
import { useAuthContext } from '../contexts/AuthContext';
import AdminRouter from '../routes/AdminRouter';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainToolbar: {
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdminDashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {
    loginState: { userToken },
    loginDispatch,
  } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      saveUser(loginDispatch, token);
      history.push('/user_details');
    } else history.push('/');
  }, [history, loginDispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItems = [
    {
      title: 'User Details',
      icon: <ContactsIcon />,
      link: '/user_details',
    },
    {
      title: 'Coupon Management',
      icon: <OfflineBoltIcon />,
      link: '/coupon_mgmt',
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar className={classes.mainToolbar}>
          {userToken && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Self Trades Admin Panel
          </Typography>
          {userToken && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => logout(loginDispatch)}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {userToken && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {listItems.map((item) => (
              <NavLink to={item.link} key={item.title}>
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AdminRouter />
        <Paper>
          <Box color="#869099" component="footer" p={2}>
            <strong>
              Copyright &copy; 2021{' '}
              <a href="https://selftrades.in" target="blank">
                Self Trades
              </a>
              .
            </strong>{' '}
            All rights reserved.
          </Box>
        </Paper>
      </main>
    </div>
  );
}
