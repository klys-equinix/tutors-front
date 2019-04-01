import React, {Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(mapProps, map, clickEvent) {
        console.log(mapProps)
        console.log(clickEvent)
    }

    render() {
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
                >
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBsaVGmYMB4M3iQ8UniR0xMHSscgjOFSu4",
    v: "3.30"
})(MapContainer);

