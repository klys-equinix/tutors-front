import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./views/login/LoginView";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {theme} from './utils/theme';
import PasswordChange from "./views/password-reset/PasswordChangeView";
import MapView from "./views/home/MapView";
import AccountReset from "./views/account-reset/AccountResetView";
import Register from "./views/register/RegisterView";
import AccountView from "./views/account/AccountView";
import * as config from "react-global-configuration";

class App extends Component {
  render() {
    config.set({
      apiUrl: 'http://localhost:8080/api',
    });

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Route exact path="/" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/password-change" component={PasswordChange}/>
          <Route path="/map" component={MapView}/>
          <Route path="/request-reset" component={AccountReset}/>
          <Route path="/account" component={AccountView}/>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
