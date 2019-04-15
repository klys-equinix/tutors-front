import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    withRouter
} from 'react-router-dom';
import {AuthRepository} from "../../data/AuthRepository";
import Grid from "@material-ui/core/Grid/Grid";
import GoogleMapsContainer from "../map/GoogleMapsContainer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {fade} from "@material-ui/core/es/styles/colorManipulator";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {CurrentUserRepository} from "../../data/CurrentUserRepository";
import Levels from "../../dict/Levels";
import Discipline from "../../dict/Discipline";
import Select from "@material-ui/core/Select";
import {TextField} from "@material-ui/core";

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
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        textColor: 'white',
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
        margin: 0,
    },
    select: {
        '&:before': {
            borderColor: 'white',
            color: 'white',
        },
        '&:after': {
            borderColor: 'white',
            color: 'white',
        }
    },
    icon: {
        fill: 'white',
    },
    whiteText: {
        color: 'white'
    }
});

class MapView extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        courseSearch: {
            level: Levels.ELEMENTARY,
            discipline: Discipline.POLISH,
            customName: '',
            hourlyRate: 0,
        }
    };

    handleProfileMenuOpen = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        AuthRepository.deleteToken();
        CurrentUserRepository.deleteCurrentUser();
        this.props.history.push('/login')
    };

    render() {
        const {anchorEl, courseSearch} = this.state;
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
                                <Select
                                    value={courseSearch.level}
                                    onChange={(event) => {
                                        this.setState(prevState => ({
                                            courseSearch: {
                                                ...prevState.courseSearch,
                                                level: event.target.value
                                            }
                                        }))
                                    }}
                                    className={classes.select}
                                    inputProps={{
                                        classes: {
                                            icon: classes.icon,
                                            root: classes.whiteText
                                        }
                                    }}
                                >
                                    {Object.values(Levels).map(val => <MenuItem
                                        value={val}>{val}</MenuItem>)}
                                </Select>
                            </div>
                            <div className={classes.search}>
                                <Select
                                    value={courseSearch.discipline}
                                    onChange={(event) => {
                                        this.setState(prevState => ({
                                            courseSearch: {
                                                ...prevState.courseSearch,
                                                discipline: event.target.value
                                            }
                                        }))
                                    }}
                                    className={classes.select}
                                    inputProps={{
                                        classes: {
                                            icon: classes.icon,
                                            root: classes.whiteText
                                        }
                                    }}
                                >
                                    {Object.values(Discipline).map(val => <MenuItem
                                        value={val}>{val}</MenuItem>)}
                                </Select>
                            </div>
                            <div className={classes.search}>
                                <TextField
                                    id="customName"
                                    value={courseSearch.customName}
                                    placeholder="Nazawa własna"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        this.setState(prevState => ({
                                            courseSearch: {
                                                ...prevState.courseSearch,
                                                customName: val
                                            }
                                        }))
                                    }}
                                    className={classes.select}
                                />
                            </div>
                            <div className={classes.search}>
                                <TextField
                                    id="hourlyRate"
                                    placeholder="Cena za godzinę"
                                    value={courseSearch.hourlyRate}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        this.setState(prevState => ({
                                            courseSearch: {
                                                ...prevState.courseSearch,
                                                hourlyRate: val
                                            }
                                        }))
                                    }}/>
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