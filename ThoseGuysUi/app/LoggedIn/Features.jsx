import * as React from "react";
import { Route, Switch, Redirect, BrowserRouter,withRouter} from 'react-router-dom';
import SignIn from "../SignIn/SignIn";
// import Test from './Test';
// import F from './LoggedIn/Features'

export default class Features extends React.Component {
    render(){
        return (
            
                <Switch key={location.pathname}>
                    <Route exact path="/signin" component={SignIn} ></Route>  
                    {/* <Route path="/servicelevel" component={ServiceLevel} ></Route> */}
                    {/* <Redirect to="/updateRoute/servicelevel"/> */}
                </Switch>
                                    

        )
    }
}


