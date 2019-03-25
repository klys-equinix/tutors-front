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
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class CreateAccountDetailsModal extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
    }
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
            <Grid xs={12} item>
              <FormControl margin="normal" className={classes.control} fullWidth>
                <InputLabel >Imię</InputLabel>
                <Input id="firstName" name="firstName" type="text" autoFocus required/>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <FormControl margin="normal" className={classes.control} fullWidth>
                <InputLabel >Nazwisko</InputLabel>
                <Input id="lastName" name="lastName" type="text" autoFocus required/>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <FormControl margin="normal" className={classes.control} fullWidth>
                <InputLabel >Numer telefonu</InputLabel>
                <Input id="phoneNumber" name="phoneNumber" type="text" autoFocus required/>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type={"submit"}
                className={classes.submit}
              >
                Zapisz dane konta
              </Button>
              <Button
                fullWidth
                className={classes.submit}
                variant="contained"
                color="secondary"
                onClick={this.props.handleClose}
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

export default withStyles(styles)(CreateAccountDetailsModal);