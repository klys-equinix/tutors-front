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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {fade} from "@material-ui/core/es/styles/colorManipulator";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  mainContainer: {
    padding: 0,
    margin:0,
  },
});

class MapView extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
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

  render() {
    const {anchorEl} = this.state;
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
        <MenuItem onClick={this.handleMenuClose}>Moje konto</MenuItem>
      </Menu>
    );

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon/>
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Tutors
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon/>
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
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
        </Grid>
        <Grid item xs={12}>
          <GoogleMapsContainer/>
        </Grid>
      </Grid>
    )
  }
}

MapView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MapView));