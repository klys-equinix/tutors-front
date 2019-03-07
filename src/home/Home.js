import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  withRouter
} from 'react-router-dom';
import {getNotes} from "./getNotes";
import {AuthRepository} from "../data/AuthRepository";
import Grid from "@material-ui/core/Grid/Grid";
import GoogleMapsContainer from "../map/GoogleMapsContainer";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  typography: {
    fontFamily: 'Lobster',
    color: 'white',
    marginBottom: "48px"
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    }
  }

  render() {
    return (
      <GoogleMapsContainer />
    );
  }

  logout = () => {
    AuthRepository.deleteToken();
    this.props.history.push('/login')
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Home));