import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import {
  withRouter
} from 'react-router-dom';
import {register} from "./register";
import {validatePassword} from "../utils/validatePassword";
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
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Register extends React.Component {
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
      const password = data.get('password');
      const passwordRepeated = data.get('passwordRepeated');
      if(password === passwordRepeated && validatePassword(password)) {
        this.setState({ error: null });

        register(data.get('login'), data.get('password'))
          .then(() => this.props.history.push('/login'));
      } else {
        this.setState({ error: 'Bad password' });
      }
    }

    render() {
        const { classes } = this.props;
      const { error } = this.state;

      return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                  { error &&
                  <Fragment>
                    <FormLabel color="error">
                      {error}
                    </FormLabel>
                  </Fragment>
                  }
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="login">Login</InputLabel>
                            <Input id="login" name="login" autoComplete="login" type="email" autoFocus required />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" required />
                        </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="passwordRepeated">Hasło powtórzone</InputLabel>
                        <Input name="passwordRepeated" type="password" id="password" required />
                      </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type={"submit"}
                        >
                            Zarejestruj się
                        </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.props.history.push('/login')}
                      >
                        Zaloguj sie
                      </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Register));