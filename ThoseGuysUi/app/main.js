import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Test from "./LoggedIn/Test"
import PrivateRoutes from "./Routes/PrivateRoute";


class Main extends React.Component {

  componentDidMount() {

  }

  render() {
      return (
        <BrowserRouter>
        <div>
        <Switch>
          <Route exact path="/signin" component={App} />
    
          <PrivateRoutes exact path="/home/test" component={Test} ></PrivateRoutes>
        </Switch>
        </div>
      </BrowserRouter>)
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));



