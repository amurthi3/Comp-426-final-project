import './App.css';
import React from 'react';
import Map from './Map';
import Console from './Console';

export default class App extends React.Component {
  render() {
    return <div className="float-container">
      <div className="float-child"><Map
        places={this.props.currPlaces}
        onMarkerClick={(place) => {
          this.props.onMapAction(place);
          this.props.onChange();
        }}
      /></div>
      <div className="float-child"><Console
        isInit={this.props.isInit}
        isOver={this.props.isOver}
        place={this.props.place}
        metrics={this.props.metrics}
        reset={this.props.reset}
        onQuit={this.props.onQuit}
      /></div>
    </div>;
  }
}