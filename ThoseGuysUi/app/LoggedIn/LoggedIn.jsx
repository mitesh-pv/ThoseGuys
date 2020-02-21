import React from 'react';
import SideNav from "./SideNav";
import Features from "./Features";
import { BrowserRouter} from 'react-router-dom';
import styles1 from "./LoggedIn.scss";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
const drawerWidth = 350;


 export default class LoggedIn extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            open:false
        }
    }
    sideNavClick  = (event) => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const { classes, theme } = this.props;
        return (
            <div>
                <BrowserRouter>
                    <React.Fragment>
                        <SideNav sideNavClick={this.sideNavClick} />
                        <main className={this.state.open ? styles1.leftMargin : ""}>
                            <Features />
                        </main>
                    </React.Fragment>
                </BrowserRouter>

            </div>
        )
    }
}
