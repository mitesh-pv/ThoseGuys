import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import User from "./LoggedIn/User/Apply"
import PrivateRoutes from "./Routes/PrivateRoute";
import PrivateRouteForAdmin from "./Routes/PrivateRouteForAdmin"
import PendingRequest from "./Admin/PendingRequst/PendingRequest";
import AllRequest from "./LoggedIn/User/AllRequest"


class Main extends React.Component {

  componentDidMount() {

  }

  render() {
      return (
        <BrowserRouter>
        <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          
          <Route exact path="/signup" component={SignUp} />
          <PrivateRouteForAdmin exact path="/home/user/apply" component={User} ></PrivateRouteForAdmin>
          <PrivateRouteForAdmin exact path="/home/user/allrequest" component={AllRequest} ></PrivateRouteForAdmin>
          <PrivateRouteForAdmin exact path="/home/admin/pending" component={PendingRequest}></PrivateRouteForAdmin>
        </Switch>
        </div>
      </BrowserRouter>)
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));



