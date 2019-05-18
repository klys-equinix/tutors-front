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
import {Button, TableCell} from "@material-ui/core";
import {AuthRepository} from "../../data/AuthRepository";
import ReactPlaceholder from "react-placeholder";
import CreateAccountDetailsForm from "./CreateAccountDetailsForm";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Icon from "@material-ui/core/Icon";
import Levels from "../../dict/Levels";
import Discipline from "../../dict/Discipline";
import {CurrentUserRepository} from "../../data/CurrentUserRepository";
import {getCurrentUser} from "../login/getCurrentUser";
import CreateOfferForm from "../map/modals/CreateOfferForm";
import Modal from "@material-ui/core/Modal";
import ShowOffersModal from "./modals/ShowOffersModal";
import ShowLessonsModal from "./modals/ShowLessonsModal";
import {getMyLessons} from "./modals/getMyLessons";
import {getMyOffers} from "./modals/getMyOffers";
import {getMyCourses} from "./modals/getMyCourses";

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
    rootPaper: {
        height: '85%'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    gridItem: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
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
    addDetails: {
        marginTop: theme.spacing.unit * 10,
        height: '100%',
        fontSize: '24px',
    },
    gridPaper: {
        height: 140,
        width: 100,
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class AccountView extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        account: null,
        ready: false,
        showDetailsModal: false,
        showingOffersModal: false,
        showingLessonsModal: false,
        showingMyLessonsModal: false,
        showingMyOffersModal: false,
        lessons: [],
        offers: []
    };

    onClose = () => {
        this.setState({
            showingOffersModal: false,
            showingLessonsModal: false,
            showingMyLessonsModal: false,
            showingMyOffersModal: false,
        })
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

    fetchData = () => {
        getCurrentUser().then((data) => {
            this.setState({account: data, ready: true})
        });

        getMyLessons().then((data) => {
            this.setState({lessons: data})
        })

        getMyOffers().then((data) => {
            this.setState({offers: data})
        })

        getMyCourses().then((data) => {
            this.setState({courses: data})
        })
    };

    componentDidMount() {
        this.fetchData();
    }

    hideModal = () => {
        this.fetchData();
        this.setState({showDetailsModal: false});
    };

    render() {
        const {
            anchorEl,
            account,
            ready,
            showDetailsModal
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
                <Paper className={classNames(classes.rootPaper, classes.paper)}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className={classNames(classes.gridItem, classes.header)}>
                            <ReactPlaceholder type='text' rows={1} ready={account}>
                                {ready && account.email}
                            </ReactPlaceholder>
                        </Grid>
                        {this.renderDetails()}
                        {!showDetailsModal && this.renderProfile()}
                    </Grid>
                </Paper>
            </div>
        )
    }

    renderDetails() {
        const {
            account,
            ready,
            showDetailsModal,
            lessons,
            offers,
        } = this.state;
        const {classes} = this.props;
        return (
            <Grid item xs={12} className={classNames(classes.gridItem)} justify={'center'}>
                <ReactPlaceholder type='text' rows={1} ready={account}>
                    {(ready && account.details) ?
                        (
                            <Paper className={classes.paper}>
                                <Grid container justify="center">
                                    <Grid item xs={3} className={classes.gridItem} spacing={12}>
                                        <InputLabel>Imię: </InputLabel>
                                        <br/>
                                        {account.details.firstName}
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridItem} spacing={12}>
                                        <InputLabel>Nazwisko: </InputLabel>
                                        <br/>
                                        {account.details.lastName}
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridItem} spacing={12}>
                                        <InputLabel>Numer telefonu: </InputLabel>
                                        <br/>
                                        {account.details.phoneNumber}
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridItem} spacing={12}>
                                        <InputLabel>Adres: </InputLabel>
                                        <br/>
                                        {account.details.addressText}
                                    </Grid>
                                    <Grid item xs={2} className={classes.gridItem} spacing={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.setState({showingMyLessonsModal: true})}
                                        >
                                            Pokaż lekcje
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2} className={classes.gridItem} spacing={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.setState({showingMyOffersModal: true})}
                                        >
                                            Pokaż oferty
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                        :
                        (
                            showDetailsModal ?
                                <Fragment>
                                    <CreateAccountDetailsForm
                                        show={showDetailsModal}
                                        handleClose={this.hideModal}
                                        userId={account.id}
                                    />
                                </Fragment>
                                :
                                <Fragment>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.addDetails}
                                        onClick={() => this.setState({showDetailsModal: true})}
                                    >
                                        Dodaj dane konta aby móc składać oferty
                                    </Button>
                                </Fragment>
                        )
                    }
                    <Modal open={this.state.showingMyOffersModal} onClose={this.onClose}>
                        <Paper className={classes.modal}>
                            <ShowOffersModal
                                handleClose={this.onClose}
                                offers={offers}
                                refetch={this.fetchData}
                                editable={false}
                            />
                        </Paper>
                    </Modal>
                    <Modal open={this.state.showingMyLessonsModal} onClose={this.onClose}>
                        <Paper className={classes.modal}>
                            <ShowLessonsModal handleClose={this.onClose}
                                              lessons={lessons}/>
                        </Paper>
                    </Modal>
                </ReactPlaceholder>
            </Grid>
        );
    }

    renderProfile() {
        const {
            account,
            ready,
            courses,
        } = this.state;
        const {classes, history} = this.props;
        return <Grid item xs={12} className={classNames(classes.gridItem, classes.userDetails)} justify={'center'}>
            <ReactPlaceholder type='text' rows={1} ready={account}>
                {(ready && account.profile) ?
                    (
                        <Paper className={classes.paper}>
                            <Grid container justify="center">
                                <Grid item xs={12} className={classes.gridItem} spacing={12}>
                                    <InputLabel>Odległość dojazdu: </InputLabel>
                                    <br/>
                                    {account.profile.range} km
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} spacing={12}>
                                    <InputLabel>Opłata za dojazd (za km): </InputLabel>
                                    <br/>
                                    {account.profile.commuteRate} zł
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} spacing={12}>
                                    <InputLabel>Dostępne miejsce korepetytora: </InputLabel>
                                    <br/>
                                    {account.profile.tutorsPlaceAvailable ? 'TAK' : 'NIE'}
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem} spacing={12}>
                                    <InputLabel>Kursy: </InputLabel>
                                    <br/>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Poziom</TableCell>
                                                <TableCell>Przedmiot</TableCell>
                                                <TableCell>Nazwa własna</TableCell>
                                                <TableCell>Cena za godzine</TableCell>
                                                <TableCell>Oferty</TableCell>
                                                <TableCell>Zajęcia</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {courses && courses.map(course => {
                                                return (
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            {Levels[course.level]}
                                                        </TableCell>
                                                        <TableCell>{Discipline[course.discipline]}</TableCell>
                                                        <TableCell>{course.customName}</TableCell>
                                                        <TableCell>{course.hourlyRate}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => this.setState({showingOffersModal: true})}
                                                            >
                                                                Pokaż oferty
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => this.setState({showingLessonsModal: true})}
                                                            >
                                                                Pokaż lekcje
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Modal open={this.state.showingOffersModal} onClose={this.onClose}>
                                <Paper className={classes.modal}>
                                    <ShowOffersModal
                                        handleClose={this.onClose}
                                        offers={courses ? courses.filter(c => c.offers.length !== 0).flatMap(course => course.offers) : []}
                                        refetch={this.fetchData}
                                        editable={true}
                                    />
                                </Paper>
                            </Modal>
                            <Modal open={this.state.showingLessonsModal} onClose={this.onClose}>
                                <Paper className={classes.modal}>
                                    <ShowLessonsModal
                                        handleClose={this.onClose}
                                        lessons={courses ? courses.filter(c => c.lessons.length !== 0).flatMap(course => course.lessons) : []}
                                    />
                                </Paper>
                            </Modal>
                        </Paper>
                    )
                    :
                    <Fragment>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.addDetails}
                            onClick={() => history.push("/map")}
                        >
                            Wybierz punkt na mapie by stworzyć profil korepetytora
                        </Button>
                    </Fragment>
                }
            </ReactPlaceholder>
        </Grid>;
    }
}

AccountView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AccountView));