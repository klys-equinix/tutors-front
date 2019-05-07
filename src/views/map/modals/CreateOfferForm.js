import React, {Component, Fragment} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {TableCell, TextField, withStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Grid from "@material-ui/core/Grid/Grid";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableBody from "@material-ui/core/TableBody/index";
import Levels from "../../../dict/Levels";
import Discipline from "../../../dict/Discipline";
import IconButton from "@material-ui/core/IconButton/index";
import Icon from "@material-ui/core/Icon/index";
import {addProfile} from "./addProfile";
import {getKeyByValue} from "../../../utils/valFinder";
import ReactPlaceholder from "react-placeholder";
import Paper from "@material-ui/core/Paper";
import CreateAccountDetailsForm from "../../account/CreateAccountDetailsForm";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            secondary: theme.palette.primary.main,
        },
    },
});

class CreateOfferForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            tutorsPlaceAvailable: true,
            courses: {},
            currentCourse: {
                level: Levels.ELEMENTARY,
                discipline: Discipline.POLISH,
                customName: '',
                hourlyRate: 0,
            }
        }
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const {classes, account} = this.props;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} className={classes.control}>
                            {this.renderDetails()}
                            {this.renderAddProfile()}
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant="contained"
                                color="primary"
                                type={"submit"}
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

    renderAddProfile() {
        const {
            account,
            classes
        } = this.props;

        return <Grid item xs={12} className={classNames(classes.control, classes.userDetails)} justify={'center'}>
            <ReactPlaceholder type='text' rows={1} ready={account}>
                <Paper className={classes.paper}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Odległość dojazdu: </InputLabel>
                            <br/>
                            {account.profile.range} km
                        </Grid>
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Opłata za dojazd (za km): </InputLabel>
                            <br/>
                            {account.profile.commuteRate} zł
                        </Grid>
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Dostępne miejsce korepetytora: </InputLabel>
                            <br/>
                            {account.profile.tutorsPlaceAvailable ? 'TAK' : 'NIE'}
                        </Grid>
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Kursy: </InputLabel>
                            <br/>
                            <RadioGroup
                                name="discipline"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Poziom</TableCell>
                                            <TableCell>Przedmiot</TableCell>
                                            <TableCell>Nazwa własna</TableCell>
                                            <TableCell>Cena za godzine</TableCell>
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
                                                        <FormControlLabel value={course.discipline} control={<Radio />} />
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