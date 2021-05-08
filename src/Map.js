import React, { Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export default class Map extends Component {
    renderInfo = (place) => {
      if (place.isOwned) {
        return;
      }
      place.isOwned = true;
      this.props.onMarkerClick(place);
    }
  
    render() {
      let center = {lat: 0.0000, lng: 0.0000};
      let zoom = 1;
      let markers = [];
      for (let i = 0; i < this.props.places.length; i++) {
          markers.push(<Marker
              lat={this.props.places[i].lat}
              lng={this.props.places[i].lng}
              text="Other Marker"
              color={this.props.places[i].isOwned? "green" : "red"}
              key={"Marker" + i}
              place={this.props.places[i]}
              onSelect={(p) => this.renderInfo(p)}
            />);
      }
      return (
        <div style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCBiPt3I-zY_PzgJDpd-ANrtfkrUcM2HfM' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            {markers}
          </GoogleMapReact>
        </div>
      );
    }
}