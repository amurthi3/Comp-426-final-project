import React from 'react';
import './Marker.css';

export default class Marker extends React.Component {
    render() {
      return (
        <div className="marker" onClick={() => this.props.onSelect(this.props.place)}
          style={{ backgroundColor: this.props.color, cursor: 'pointer'}}
          title={this.props.name}
        />
      );
    }
  };