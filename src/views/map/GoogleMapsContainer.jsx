import React, {Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import CreateProfileForm from "./CreateProfileForm";
import {InfoWindowEx} from "./InfoWindowEx";
import {getProfiles} from "./getProfiles";

const styles = theme => ({
    addProfile: {
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 150,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    modal: {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    gridItem: {
        padding: theme.spacing.unit,
    },
});

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingProfileCreationButton: false,
            showingProfileCreationWindow: false,
            profileCreationMarker: {},
            selectedPlace: {},
            profileCreationMarkerPosition: {},
            tutors: [],
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            profileCreationMarker: marker,
            showingProfileCreationButton: true
        });
    };

    onMapClicked = (mapProps, map, clickEvent) => {
        this.setState({
            profileCreationMarkerPosition: {
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng()
            }
        });
        if (this.state.showingProfileCreationButton) {
            this.setState({
                showingProfileCreationButton: false,
                profileCreationMarker: null,
                profileCreationMarkerPosition: {}
            })
        }
    };

    fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        getProfiles(52.237049, 21.017532, 10)
            .then(resp => this.setState({tutors: resp.data}));
    }

    onClose = () => {
        this.setState({showingProfileCreationWindow: false, showingProfileCreationButton: false})
    };

    onOpen = () => {
        this.setState({showingProfileCreationWindow: true})
    };

    render() {
        const {
            classes
        } = this.props;

        if (!this.props.google) {
            return <div>Loading...</div>;
        }

        return (
            <div
                style={{
                    position: "relative",
                    height: "calc(95vh)",
                    padding: "0px"
                }}
            >
                <Map
                    style={{}}
                    google={this.props.google}
                    zoom={14}
                    center={{
                        lat: 52.237049,
                        lng: 21.017532
                    }}
                    initialCenter={{
                        lat: 52.237049,
                        lng: 21.017532
                    }}
                    onClick={this.onMapClicked}
                    onReady={this.fetchPlaces}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        position={this.state.profileCreationMarkerPosition}
                    />
                    <InfoWindowEx
                        marker={this.state.profileCreationMarker}
                        visible={this.state.showingProfileCreationButton}
                    >
                        <div>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.addProfile}
                                onClick={this.onOpen}
                            >
                                Stwórz profil z tą lokalizacją
                            </Button>
                        </div>
                    </InfoWindowEx>
                    {
                        this.state.tutors.map(tutor => {
                            return (
                                <Marker
                                    title={tutor.email}
                                    position={{lat: tutor.profile.lat, lng: tutor.profile.lng}}
                                />
                            )
                        })
                    }
                </Map>
                <Modal open={this.state.showingProfileCreationWindow} onClose={this.onClose}>
                    <Paper className={classNames(classes.paper, classes.modal)}>
                        <CreateProfileForm handleClose={this.onClose} userCoords={this.state.profileCreationMarkerPosition}/>
                    </Paper>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(GoogleApiWrapper({
    apiKey: "AIzaSyBsaVGmYMB4M3iQ8UniR0xMHSscgjOFSu4",
    v: "3.30"
})(MapContainer));

