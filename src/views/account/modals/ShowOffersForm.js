import React, {Component, Fragment} from "react";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Button from "@material-ui/core/Button/Button";
import {TableCell, TextField, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import classNames from "classnames";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableBody from "@material-ui/core/TableBody/index";
import ReactPlaceholder from "react-placeholder";
import Paper from "@material-ui/core/Paper";
import {acceptOffer} from "./acceptOffer";


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


class ShowOffersForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {}
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} className={classes.control}>
                            {this.renderOffers()}
                        </Grid>
                        <Grid xs={6} item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.props.handleClose}
                                className={classNames(classes.button)}
                            >
                                Zamknij
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        );
    }

    renderOffers() {
        const {
            courses,
            classes,
            refetch
        } = this.props;
        return <Grid item xs={12} className={classNames(classes.control)} justify={'center'}>
            <ReactPlaceholder type='text' rows={1} ready={courses}>
                <Paper className={classes.paper}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.control} spacing={12}>
                            <InputLabel>Oferty: </InputLabel>
                            <br/>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dzień</TableCell>
                                        <TableCell>Godzina</TableCell>
                                        <TableCell>Dane klienta</TableCell>
                                        <TableCell>Akceptuj</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courses.filter(c => c.offers.length !== 0).flatMap(course => course.offers).map(offer => {
                                        console.log(offer)
                                        return (
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {offer.day}
                                                </TableCell>
                                                <TableCell>{offer.hour}</TableCell>
                                                <TableCell>{offer.createdBy.email}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => acceptOffer(offer.id).then(refetch)}
                                                    >
                                                        Akceptuj
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
            </ReactPlaceholder>
        </Grid>;
    }

};

export default withStyles(styles)(ShowOffersForm);