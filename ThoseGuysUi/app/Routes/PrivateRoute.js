import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideNav from './../LoggedIn/SideNav'

class PrivateRoute extends React.Component {
    render() {
        let { component, ...rest } = this.props;
        console.log("props recieved::", this.props);
        return (
            <Route
                {...rest}
                render={props => {
                    return (<SideNav Component={component} rprops={props} />)
                }} />
        );
    }
};

export default PrivateRoute;