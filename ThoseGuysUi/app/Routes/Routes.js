import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Test from "./LoggedIn/Test"

const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />

      <Route exact path="/test" component={Test} ></Route>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  routing
  , document.getElementById("root"));



