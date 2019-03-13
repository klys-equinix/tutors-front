import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login/Login";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { theme } from './utils/theme';
import PasswordChange from "./password-reset/PasswordChange";
import MapView from "./home/MapView";
import AccountReset from "./account-reset/AccountReset";
import Register from "./register/Register";

class App extends Component {
  render() {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/password-change" component={PasswordChange} />
                <Route path="/map" component={MapView} />
                <Route path="/request-reset" component={AccountReset} />
            </MuiThemeProvider>
        </Router>
    );
  }
}

export default App;
