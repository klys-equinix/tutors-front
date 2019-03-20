import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  withRouter
} from 'react-router-dom';
import {authenticate} from "./authenticate";
import FormLabel from "@material-ui/core/es/FormLabel/FormLabel";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  submitButton: {
    marginTop: theme.spacing.unit * 3,
  },
  secondaryButton: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.secondary.main,
  },
});

class LoginView extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    authenticate(data.get('login'), data.get('password'))
      .then(() => this.props.history.push('/map'))
      .catch((e) => this.setState({error: e}));
  }

  render() {
    const {classes} = this.props;
    const {error} = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {error &&
          <Fragment>
            <FormLabel color="error">
              {error}
            </FormLabel>
          </Fragment>
          }
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="login">Login</InputLabel>
              <Input id="login" name="login" autoComplete="login" type="email" autoFocus required/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Hasło</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" required/>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
              type={"submit"}
            >
              Zaloguj się
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.secondaryButton}
              onClick={() => this.props.history.push('/')}
            >
              Zarejestruj się
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.secondaryButton}
              onClick={() => this.props.history.push('/request-reset')}
            >
              Odzyskaj dostęp
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(LoginView));