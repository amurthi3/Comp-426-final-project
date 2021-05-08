import React from 'react'

export default class Metrics extends React.Component {
    render() {
        return <div>
            <h4>Your Score Metrics</h4>
            <p>Level {this.props.metricData.level}</p>
            <p>Places Owned: {this.props.metricData.numOwned}</p>
            <p>Cash: ${this.props.metricData.credits}</p>
        </div>;
    }
}