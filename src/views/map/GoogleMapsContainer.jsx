import React, {Component, Fragment} from "react";
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import CreateProfileForm from "./modals/CreateProfileForm";
import {InfoWindowEx} from "./InfoWindowEx";
import {getProfiles} from "./getProfiles";
import {CurrentUserRepository} from "../../data/CurrentUserRepository";
import Typography from "@material-ui/core/Typography";
import Circle from "./Circle";
import circle from "../../circle.png"
import createCricle from "../../createCircle.png"
import Levels from "../../dict/Levels";
import CreateOfferForm from "./modals/CreateOfferForm";
import {getCurrentUser} from "../login/getCurrentUser";


const styles = theme => ({
    addProfile: {
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        position: 'absolute',
        width: '80%',
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
    tutorInfo: {
        width: '20px',
        height: '10px'
    }
});

const initialCenter = {
    lat: 52.237049,
    lng: 21.017528
}

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingProfileCreationButton: false,
            showingProfileCreationWindow: false,
            showingOfferCreationWindow: false,
            tutorForOffer: {},
            profileCreationMarker: {},
            clickedTutorMarker: null,
            clickedTutorEmail: {},
            selectedPlace: {},
            profileCreationMarkerPosition: null,
            tutors: [],
            currentUser: {},
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            profileCreationMarker: marker,
            showingProfileCreationButton: true
        });
    };

    onTutorMarkerClick = (props, marker, e) => {
        this.setState({
            clickedTutorMarker: marker,
            clickedTutorEmail: props.title
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
                profileCreationMarkerPosition: null
            })
        }
    };

    zoomed = (mapProps, map) => {
        console.log(mapProps)
        debugger
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.fetchWithNewParams(nextProps.searchParams)
    }

    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                getCurrentUser().then(c => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        },
                        currentUser: c
                    })
                })
            })
        }
    }

    fetchPlaces = () => {
        const {searchParams} = this.props;
        navigator.geolocation.getCurrentPosition((pos) => {
            const navCoords = pos.coords;
            const coords = {
                lat: navCoords.latitude ? navCoords.latitude : initialCenter.lat,
                lng: navCoords.longitude ? navCoords.longitude : initialCenter.lng
            };
            getProfiles(coords.lat, coords.lng, searchParams)
                .then(resp => {
                    this.setState({tutors: resp.data})
                });
        });
    };

    fetchWithNewParams = (searchParams) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const navCoords = pos.coords;
            const coords = {
                lat: navCoords.latitude ? navCoords.latitude : initialCenter.lat,
                lng: navCoords.longitude ? navCoords.longitude : initialCenter.lng
            };
            getProfiles(coords.lat, coords.lng, searchParams)
                .then(resp => {
                    this.setState({tutors: resp.data})
                });
        });
    };

    onClose = () => {
        this.setState({
            showingProfileCreationWindow: false,
            showingProfileCreationButton: false,
            showingOfferCreationWindow: false
        })
    };

    onProfileCreationOpen = () => {
        this.setState({showingProfileCreationWindow: true})
    };

    onOfferCreationOpen = (tutor) => {
        this.setState({showingOfferCreationWindow: true, tutorForOffer: tutor})
    };

    render() {
        const {
            classes,
            google
        } = this.props;

        const {
            currentUser,
            clickedTutorMarker,
            clickedTutorEmail,
            profileCreationMarkerPosition,
            currentLocation
        } = this.state;

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
                    center={this.state.currentLocation}
                    initialCenter={initialCenter}
                    onClick={this.onMapClicked}
                    onReady={this.fetchPlaces}
                    onZoomChanged={this.zoomed}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        position={profileCreationMarkerPosition ? profileCreationMarkerPosition : currentLocation}
                        icon={{
                            url: createCricle,
                            anchor: new google.maps.Point(22, 22),
                            scaledSize: new google.maps.Size(22, 22)
                        }}
                    />
                    <InfoWindowEx
                        marker={this.state.profileCreationMarker}
                        visible={this.state.showingProfileCreationButton}
                    >
                        <div>
                            {
                                !currentUser.details ?
                                    (
                                        <span>Dodaj dane konta aby móc utowrzyć profil</span>
                                    )
                                    :
                                    (
                                        !currentUser.profile ?
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.addProfile}
                                                onClick={this.onProfileCreationOpen}
                                            >
                                                Stwórz profil z tą lokalizacją
                                            </Button>
                                            :
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.addProfile}
                                            >
                                                Zmien swój adres
                                            </Button>
                                    )

                            }
                        </div>
                    </InfoWindowEx>
                    {
                        this.state.tutors.map(tutor => {
                            if (tutor.email !== currentUser.email) {
                                return this.renderAvailableTutorMarker(tutor)
                            }
                        })
                    }
                    {
                        this.state.tutors.map(tutor => {
                            if (tutor.email !== currentUser.email) {
                                return this.renderAvailableTutorCircle(tutor)
                            }
                        })
                    }
                    {
                        clickedTutorMarker &&
                        this.renderAvailableTutorWindow(clickedTutorEmail)
                    }
                </Map>
                <Modal open={this.state.showingProfileCreationWindow} onClose={this.onClose}>
                    <Paper className={classNames(classes.paper, classes.modal)}>
                        <CreateProfileForm handleClose={this.onClose}
                                           userCoords={this.state.profileCreationMarkerPosition}/>
                    </Paper>
                </Modal>
                <Modal open={this.state.showingOfferCreationWindow} onClose={this.onClose}>
                    <Paper className={classNames(classes.paper, classes.modal)}>
                        <CreateOfferForm handleClose={this.onClose}
                                         account={this.state.tutorForOffer}/>
                    </Paper>
                </Modal>
            </div>
        );
    }

    renderAvailableTutorMarker = (tutor) => {
        const {
            google
        } = this.props;

        return (
            <Marker
                title={tutor.email}
                position={{lat: tutor.profile.lat, lng: tutor.profile.lng}}
                onClick={this.onTutorMarkerClick}
                icon={{
                    url: circle,
                    anchor: new google.maps.Point(22, 22),
                    scaledSize: new google.maps.Size(22, 22)
                }}
            />
        );
    };

    renderAvailableTutorCircle = (tutor) => {
        return (
            <Circle
                radius={tutor.profile.range * 1000}
                center={{lat: tutor.profile.lat, lng: tutor.profile.lng}}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#4286f4'
                fillOpacity={0.2}
            />
        );
    }

    renderAvailableTutorWindow = () => {
        const {
            classes
        } = this.props;
        const {
            tutors,
            clickedTutorEmail,
            clickedTutorMarker,
        } = this.state;

        let tutor = tutors.find((el) => el.email === clickedTutorEmail);

        return (
            <InfoWindowEx
                visible={true}
                style={classes.tutorInfo}
                marker={clickedTutorMarker}
            >
                <Fragment>
                    <Typography variant="caption" gutterBottom align="center">
                        {tutor.details.firstName + ' ' + tutor.details.lastName}
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.addProfile}
                        onClick={() => this.onOfferCreationOpen(tutor)}
                    >
                        Zobacz szczegóły
                    </Button>
                </Fragment>
            </InfoWindowEx>
        );
    }
}

export default withStyles(styles)

(
    GoogleApiWrapper({
        apiKey: "AIzaSyBsaVGmYMB4M3iQ8UniR0xMHSscgjOFSu4",
        v: "3.30"
    })

    (
        MapContainer
    ))
;

