import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import {getUsers} from "./getUsers";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {addNote} from "./addNote";
import Grid from "@material-ui/core/Grid/Grid";

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
});

class CreateNoteModal extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      users: [],
      name: [],
      unrestricted: false,
    }
  }

  componentDidMount() {
    getUsers().then((data) => {
      this.setState({users: data.data});
    })
  }

  handleChange = event => {
    this.setState({name: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    const {name, unrestricted} = this.state;
    const {handleClose} = this.props;
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    data['unrestricted'] = unrestricted;
    data['authorizedUserIds'] = name;
    addNote(data).then(() => handleClose())
  }

  render() {
    const {users, unrestricted} = this.state;
    const {classes} = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container>
            <Grid xs={12} item>
              <FormControl margin="normal" className={classes.control} fullWidth>
                <InputLabel htmlFor="password">Tekst</InputLabel>
                <Input id="text" name="text" type="text" autoFocus required/>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <FormControl className={classes.control} fullWidth>
                <InputLabel htmlFor="unrestricted">Dostepna ogolnie</InputLabel>
                <Checkbox checked={unrestricted} onChange={() => this.setState({unrestricted: !unrestricted})}
                          value="unrestricted"/>
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <FormControl className={classes.control} fullWidth>
                <Select
                  multiple
                  displayEmpty
                  value={this.state.name}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-placeholder"/>}
                  renderValue={selected => {
                    if (selected.length === 0) {
                      return <em>Placeholder</em>;
                    }

                    return selected.join(', ');
                  }}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="">
                    Placeholder
                  </MenuItem>
                  {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type={"submit"}
          >
            Dodaj notatkę
          </Button>
        </form>
      </Fragment>
    );
  }
};

export default withStyles(styles)(CreateNoteModal);