import React from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { NavLink, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
import Button from "@material-ui/core/Button"

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


const drawerWidth = 350;

const styles = theme => ({
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
    menuButton: {
        marginRight: 36,
        // left: "-830%"
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
            width: 0,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logout: {
        left: "160%",
        position: "absolute"
    }
});


class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    handleDrawerOpen = () => {
        this.setState({
            open: true
        })
        this.props.sideNavClick()
    }
    handleDrawerClose = () => {
        this.setState({
            open: false
        })

        this.props.sideNavClick()
    };
    handleLogOut = () => {
        console.log("log out")
        Cookies.remove("auth");
        location.href = "http://localhost:9000/login";
    }
    handlePendingRequest = () => {
        location.href = "http://localhost:9000/home/admin/pending"
    }
    handleApprovedRequest = () => {
        location.href = "http://localhost:9000/home/admin/approved"
    }
    handleApplyInsurance = () => {
        location.href = "http://localhost:9000/home/user/apply"
    }
    handleAllRequest = () => {
        location.href = "http://localhost:9000/home/user/allrequest"
    }


    render() {
        const { classes, Component, rprops, theme } = this.props;
        return (
            <div className={classes.root}>
                <AppBar
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            ThoseGuys Insurance Inc.
                        </Typography>
                        <IconButton
                            style={{ position: "absolute", right: "4%" }}
                            onClick={this.handleLogOut}>
                            <PowerSettingsNewIcon
                                style={{ color: "white" }}
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        <div
                            style={{ position: "absolute", left: "6%", top: "2%" }}
                        >
                            <Typography variant="h5">
                                Welcome! &nbsp; &nbsp;
                                    {JSON.parse(Cookies.get("auth")).name}
                            </Typography>
                        </div>

                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {JSON.parse(Cookies.get("auth")).userType == "admin" ?
                        <div>
                            <List>
                                <ListItem button key={"Pending Request"}
                                    onClick={this.handlePendingRequest}
                                >
                                    <Typography variant="h6">
                                        Pending Request
                                 </Typography>
                                </ListItem>
                            </List>
                            <Divider />
                            <Divider />
                        </div>
                        :
                        <div>
                            <List>
                                <ListItem button key={"Apply Insurance"}
                                    onClick={this.handleApplyInsurance}
                                >
                                    <Typography variant="h6">
                                    Apply Insurance
                                 </Typography>
                                </ListItem>
                            </List>
                            <Divider />

                            <Divider />
                            <List>
                                <ListItem button key={"ALl Request"}
                                    onClick={this.handleAllRequest}
                                >
                                    <Typography variant="h6">
                                    All Request
                                 </Typography>
                                </ListItem>
                            </List>
                            <Divider />
                        </div>
                    }

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Component {...rprops} />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SideNav);