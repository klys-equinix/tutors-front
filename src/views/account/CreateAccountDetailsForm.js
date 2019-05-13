import React, {Component, Fragment} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Grid from "@material-ui/core/Grid/Grid";
import {addUserDetails} from "./addUserDetails";
import classNames from "classnames";

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
};

const styles = theme => ({
    control: {
        padding: '10px',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 1,
    },
    submit: {
        float: 'right'
    },
});

class CreateAccountDetailsForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        event.preventDefault();
        const {handleClose, userId} = this.props;
        const formData = new FormData(event.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
        addUserDetails(userId, data).then(() => handleClose())
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid xs={12} item className={classes.control}>
                            <FormControl fullWidth>
                                <InputLabel>Imię</InputLabel>
                                <Input id="firstName" name="firstName" type="text" autoFocus required/>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item className={classes.control}>
                            <FormControl fullWidth>
                                <InputLabel>Nazwisko</InputLabel>
                                <Input id="lastName" name="lastName" type="text" autoFocus required/>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item className={classes.control}>
                            <FormControl fullWidth>
                                <InputLabel>Numer telefonu</InputLabel>
                                <Input id="phoneNumber" name="phoneNumber" type="text" autoFocus required/>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item className={classes.control}>
                            <FormControl fullWidth>
                                <InputLabel>Adres</InputLabel>
                                <Input id="addressText" name="addressText" type="text" autoFocus required/>
                            </FormControl>
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant="contained"
                                color="primary"
                                type={"submit"}
                                className={classNames(classes.button, classes.submit)}
                            >
                                Zapisz dane konta
                            </Button>
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.props.handleClose}
                                className={classNames(classes.button)}
                            >
                                Anuluj
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Fragment>
        );
    }
};

export default withStyles(styles)(CreateAccountDetailsForm);