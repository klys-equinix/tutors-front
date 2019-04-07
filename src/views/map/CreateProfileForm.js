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
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Levels from "../../dict/Levels";
import Discipline from "../../dict/Discipline";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {addProfile} from "./addProfile";

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

class CreateProfileForm extends Component {
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

    addRow = () => {
        const {currentCourse, courses} = this.state;
        const newCourses = [];
        Object.assign(newCourses, courses);
        if (newCourses[currentCourse.level] !== undefined) {
            if (newCourses[currentCourse.level].findIndex(i => i.discipline === currentCourse.discipline) === -1) {
                newCourses[currentCourse.level].push(currentCourse)
            }
        } else {
            newCourses[currentCourse.level] = [currentCourse];
        }
        this.setState({
            courses: newCourses,
            currentCourse: {
                level: Levels.ELEMENTARY,
                discipline: Discipline.POLISH,
                customName: '',
                hourlyRate: 0,
            }
        })
    };

    removeRow = (rowToRemove) => {
        const {courses} = this.state;
        const newCourses = [];
        Object.assign(newCourses, courses);
        if (newCourses[rowToRemove.level].length === 1) {
            delete newCourses[rowToRemove.level];
        } else {
            newCourses[rowToRemove.level].splice(newCourses[rowToRemove.level].findIndex(i => i.discipline === rowToRemove.discipline), 1);
        }
        this.setState({
            courses: newCourses
        })
    };

    getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    };

    handleSubmit(event) {
        event.preventDefault();
        const {handleClose, userCoords} = this.props;
        const {courses, tutorsPlaceAvailable} = this.state;
        const formData = new FormData(event.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
        const coursesToSubmit = [];
        Object.keys(courses).map(rowKey => {
            courses[rowKey].map(subRow => {
                subRow.level = this.getKeyByValue(Levels, subRow.level);
                subRow.discipline = this.getKeyByValue(Discipline, subRow.discipline);
                coursesToSubmit.push(subRow);
            })
        });
        data.courses = coursesToSubmit;
        data.tutorsPlaceAvailable = tutorsPlaceAvailable;
        data.lat = userCoords.lat;
        data.lng = userCoords.lng;
        addProfile(data).then(() => handleClose())
    }

    render() {
        const {classes} = this.props;
        const {tutorsPlaceAvailable} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} className={classes.control}>
                            <Typography variant="h6" id="modal-title">
                                Dodaj szczegóły konta
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.control}>
                            <FormControl required fullWidth>
                                <InputLabel>Odległość dojazdu (km)</InputLabel>
                                <Input id="range" name="range" required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.control}>
                            <FormControl required fullWidth>
                                <InputLabel>Opłata za dojazd (za kilometr)</InputLabel>
                                <Input id="commuteRate" name="commuteRate" required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.control}>
                            <FormControl required fullWidth>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tutorsPlaceAvailable}
                                            onChange={() => this.setState({tutorsPlaceAvailable: !tutorsPlaceAvailable})}
                                            value="Lekcje u korepetytora?"
                                        />
                                    }
                                    label="Lekcje u korepetytora?"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.control}>
                            {this.getCoursesInputTable()}
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

    getCoursesInputTable = () => {
        const {courses, currentCourse} = this.state;
        const {classes} = this.props;
        return <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Poziom</TableCell>
                    <TableCell>Przedmiot</TableCell>
                    <TableCell>Nazwa własna</TableCell>
                    <TableCell>Cena za godzine</TableCell>
                    <TableCell>Akcja</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(courses).map(rowKey =>
                    courses[rowKey].map(subRow => {
                        return (
                            <TableRow className={classes.row}>
                                <TableCell component="th" scope="row">
                                    {subRow.level}
                                </TableCell>
                                <TableCell>{subRow.discipline}</TableCell>
                                <TableCell>{subRow.customName}</TableCell>
                                <TableCell>{subRow.hourlyRate}</TableCell>
                                <TableCell>
                                    <IconButton aria-haspopup="true" onClick={() => this.removeRow(subRow)}
                                                color="inherit">
                                        <Icon>remove_circle</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    }))
                }
                <TableRow className={classes.row} key={0}>
                    <TableCell component="th" scope="row">
                        <Select
                            value={currentCourse.level}
                            onChange={(event) => {
                                this.setState(prevState => ({
                                    currentCourse: {
                                        ...prevState.currentCourse,
                                        level: event.target.value
                                    }
                                }))
                            }}
                        >
                            {Object.values(Levels).map(val => <MenuItem
                                value={val}>{val}</MenuItem>)}
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select
                            value={currentCourse.discipline}
                            onChange={(event) => {
                                this.setState(prevState => ({
                                    currentCourse: {
                                        ...prevState.currentCourse,
                                        discipline: event.target.value
                                    }
                                }))
                            }}
                        >
                            {Object.values(Discipline).map(val => <MenuItem
                                value={val}>{val}</MenuItem>)}
                        </Select>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="customName"
                            value={currentCourse.customName}
                            onChange={(e) => {
                                const val = e.target.value;
                                this.setState(prevState => ({
                                    currentCourse: {
                                        ...prevState.currentCourse,
                                        customName: val
                                    }
                                }))
                            }}/>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="hourlyRate"
                            value={currentCourse.hourlyRate}
                            onChange={(e) => {
                                const val = e.target.value;
                                this.setState(prevState => ({
                                    currentCourse: {
                                        ...prevState.currentCourse,
                                        hourlyRate: val
                                    }
                                }))
                            }}/>
                    </TableCell>
                    <TableCell>
                        <IconButton aria-haspopup="true" onClick={this.addRow} color="inherit">
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>;
    }
};

export default withStyles(styles)(CreateProfileForm);