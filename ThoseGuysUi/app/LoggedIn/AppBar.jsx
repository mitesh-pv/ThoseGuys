import React from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TopBar from '@material-ui/core/AppBar';
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
        left: "-830%"
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
    logout:{
        left:"560%",
        position:"absolute"
    }
});


class AppBar extends React.Component {
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
    handleLogOut=()=>{
        console.log("log out")
        Cookies.remove("auth");
        location.href="http://localhost:9000/login";
    }
    

    render() {
        const { classes, Component, rprops, theme } = this.props;
        return (
            <div className={classes.root}>
                <TopBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <div style={{display:"flex"}}>
                    
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                                ThoseGuys Insurance Inc.
                        </Typography>
                        <IconButton
                        className={classes.logout}
                        onClick={this.handleLogOut}>
                            <PowerSettingsNewIcon/>
                        </IconButton>
                    </Toolbar>
                    </div>
                </TopBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Component {...rprops} />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppBar);