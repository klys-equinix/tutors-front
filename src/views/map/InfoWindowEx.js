import {Component} from "react";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {InfoWindow} from "google-maps-react";


export class InfoWindowEx extends Component {
    constructor(props) {
        super(props);
        this.infoWindowRef = React.createRef();
        this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
        if (!this.containerElement) {
            this.containerElement = document.createElement(`div`);
        }
    }

    onInfoWindowOpen() {
        ReactDOM.render(React.Children.only(this.props.children), this.containerElement);
        this.infoWindowRef.current.infowindow.setContent(this.containerElement);
    }
    render() {
        return <InfoWindow onOpen={this.onInfoWindowOpen} ref={this.infoWindowRef} {...this.props}/>
    }
}