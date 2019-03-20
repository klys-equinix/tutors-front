import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  withRouter
} from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "../home/MapView";
import {Button} from "@material-ui/core";
import {AuthRepository} from "../../data/AuthRepository";
import ReactPlaceholder from "react-placeholder";
import {getAccount} from "./getAccount";

const styles = theme => ({
  mainContainer: {
    flexGrow: 1,
    height: '100%'
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
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    height: '85%'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  gridItem: {
    padding: theme.spacing.unit,
  },
  header: {
    fontSize: '40px',
    color: theme.palette.secondary.main,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
});

class AccountView extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    account: null,
    ready: false,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    AuthRepository.deleteToken();
    this.props.history.push('/login')
  };

  fetchData = () => {
    getAccount().then(resp => this.setState({account: resp.data, ready: true }));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      anchorEl,
      account,
      ready
    } = this.state;
    const {classes} = this.props;

    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.logout}>Wyloguj</MenuItem>
        <MenuItem onClick={() => this.props.history.push("/account")}>Moje konto</MenuItem>
      </Menu>
    );
    return (
      <div className={classes.mainContainer}>
          <AppBar position="static">
            <Toolbar>
              <Button style={{color: 'white'}} onClick={() => this.props.history.push('/map')}>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Tutors
                </Typography>
              </Button>
              <div className={classes.grow}/>
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                  <MoreIcon/>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classNames(classes.gridItem, classes.header)}>
                <ReactPlaceholder type='text' rows={1} ready={account}>
                  {ready && account.email}
                </ReactPlaceholder>
              </Grid>
            </Grid>
          </Paper>
      </div>
    )
  }
}

AccountView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AccountView));