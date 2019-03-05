import React from 'react';
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
import {authenticate} from "../login/authenticate";
import {requestReset} from "./requestReset";

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

class AccountReset extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      requestReset(data.get('login'))
        .then(() => this.props.history.push('/login'));
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="login">Login</InputLabel>
                        <Input id="login" name="login" autoComplete="login" autoFocus required />
                      </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type={"submit"}
                        >
                            Odzyskaj konto
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

AccountReset.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AccountReset));