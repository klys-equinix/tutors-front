import React, {Component, Fragment} from "react";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Button from "@material-ui/core/Button/Button";
import {TableCell, TextField, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import classNames from "classnames";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableBody from "@material-ui/core/TableBody/index";
import Levels from "../../../dict/Levels";
import Discipline from "../../../dict/Discipline";
import ReactPlaceholder from "react-placeholder";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TimeInput from 'material-ui-time-picker'
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {createOffer} from "../createOffer";


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
    table: {
        minWidth: '80%',
    },
    row: {
        '&:nth-of-type(odd)': {
            secondary: theme.palette.primary.main,
        },
    }
});

const days = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela'
]

class CreateOfferForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            tutorsPlaceAvailable: true,
            courses: {},
            offer: {
                hour: new Date(),
                day: days[0]
            }
        }
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        const {
            offer,
            pickedCourse
        } = this.state;

        const {
            handleClose
        } = this.props;
        event.preventDefault();
        if(pickedCourse) {
            createOffer(pickedCourse, offer).then(handleClose)
        }
    }

    setOfferTime(time) {
        this.setState(prevState => ({
            offer: {
                ...prevState.offer,
                hour: time
            }
        }))
    }



    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} className={classes.control}>
                            {this.renderDetails()}
                            {this.renderProfileDetails()}
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant="contained"
                                color="primary"
                                type={"submit"}
                                onClick={this.handleSubmit}
                                className={classNames(classes.button, classes.submit)}
                            >
                                Złóż ofertę
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

    renderDetails() {
        const {
            account,
            classes
        } = this.props;

        return (
            <Grid item xs={12} className={classNames(classes.control)} justify={'center'}>
                <ReactPlaceholder type='text' rows={1} ready={account}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center">
                            <Grid item xs={12} className={classes.control} spacing={12}>
                                <InputLabel>Imię: </InputLabel>
                                <br/>
                                {account.details.firstName}
                            </Grid>
                            <Grid item xs={12} className={classes.control} spacing={12}>
                                <InputLabel>Nazwisko: </InputLabel>
                                <br/>
                                {account.details.lastName}
                            </Grid>
                            <Grid item xs={12} className={classes.control} spacing={12}>
                                <InputLabel>Numer telefonu: </InputLabel>
                                <br/>
                                {account.details.phoneNumber}
                            </Grid>
                        </Grid>
                    </Paper>
                </ReactPlaceholder>
            </Grid>
        );
    }

    renderProfileDetails() {
        const {
            account,
            classes
        } = this.props;

        return <Grid item xs={12} className={classNames(classes.control)} justify={'center'}>
            <ReactPlaceholder type='text' rows={1} ready={account}>
                <Paper className={classes.paper}>
                    <Grid container justify="center">
                        <Grid item xs={3} className={classes.control} spacing={12}>
                            <InputLabel>Odległość dojazdu: </InputLabel>
                            <br/>
                            {account.profile.range} km
                        </Grid>
                        <Grid item xs={3} className={classes.control} spacing={12}>
                            <InputLabel>Opłata za dojazd (za km): </InputLabel>
                            <br/>
                            {account.profile.commuteRate} zł
                        </Grid>
                        <Grid item xs={3} className={classes.control} spacing={12}>
                            <InputLabel>Dostępne miejsce korepetytora: </InputLabel>
                            <br/>
                            {account.profile.tutorsPlaceAvailable ? 'TAK' : 'NIE'}
                        </Grid>
                        <Grid item xs={3} className={classes.control} spacing={12}>
                            <InputLabel>Adres: </InputLabel>
                            <br/>
                            {account.details.addressText}
                        </Grid>
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Kursy: </InputLabel>
                            <br/>
                            <RadioGroup
                                name="discipline"
                                value={this.state.pickedCourse}
                                onChange={(e) => this.setState({pickedCourse: e.target.value})}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Poziom</TableCell>
                                            <TableCell>Przedmiot</TableCell>
                                            <TableCell>Nazwa własna</TableCell>
                                            <TableCell>Cena za godzine</TableCell>
                                            <TableCell>Dzień</TableCell>
                                            <TableCell>Godzina</TableCell>
                                            <TableCell>Wybierz</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {account.profile.courses.map(course => {
                                            return (
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {Levels[course.level]}
                                                    </TableCell>
                                                    <TableCell>{Discipline[course.discipline]}</TableCell>
                                                    <TableCell>{course.customName}</TableCell>
                                                    <TableCell>{course.hourlyRate}</TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={this.state.offer.day}
                                                            onChange={(event) => {
                                                                this.setState(prevState => ({
                                                                    offer: {
                                                                        ...prevState.offer,
                                                                        day: event.target.value
                                                                    }
                                                                }))
                                                            }}
                                                        >
                                                            {Object.values(days).map(val => <MenuItem
                                                                value={val}>{val}</MenuItem>)}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TimeInput
                                                            mode='24h'
                                                            onChange={(time) => this.setOfferTime(time)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControlLabel value={course.id} control={<Radio />} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </ReactPlaceholder>
        </Grid>;
    }

};

export default withStyles(styles)(CreateOfferForm);