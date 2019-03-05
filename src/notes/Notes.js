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
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Table from "@material-ui/core/Table/Table";
import CreateNoteModal from './CreateNoteModal';
import {getNotes} from "./getNotes";
import {AuthRepository} from "../data/AuthRepository";
import Grid from "@material-ui/core/Grid/Grid";

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

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      show: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    getNotes().then((resp) => this.setState({notes: resp.data}))
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.fetchData();
    this.setState({ show: false });
  };

  renderRow = inst => (
    <TableRow>
      <TableCell component="th" scope="row">{inst.id}</TableCell>
      <TableCell component="th" scope="row">{inst.text}</TableCell>
    </TableRow>
  );

  render() {
    const {classes} = this.props;
    const {notes, show} = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Fragment>
            <Grid container>
              <Button type="button" onClick={() => this.props.history.push('/password-change')}>
                Zmien haslo
              </Button>
              <Button variant="contained" color="primary" onClick={() => this.logout()}>Wyloguj się</Button>
            </Grid>
          </Fragment>
          <Fragment>
            <Table>
              <TableHead className="with-shadow">
                <TableRow>
                  <TableCell className="f-s-18">Id</TableCell>
                  <TableCell className="f-s-18">Tekst</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map(object => this.renderRow(object))}
              </TableBody>
            </Table>
            {show ?
              <Fragment><CreateNoteModal show={show} handleClose={this.hideModal} /></Fragment>
              :
              <Fragment>
                <Button type="button" onClick={this.showModal}>
                  Dodaj notatkę
                </Button>
              </Fragment>
            }
          </Fragment>
        </Paper>
      </main>
    );
  }

  logout = () => {
    AuthRepository.deleteToken();
    this.props.history.push('/login')
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Notes));