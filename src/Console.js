import React from 'react';
import Metrics from './Metrics.js'
import './Console.css'

export default class Console extends React.Component {
    render() {
        if (this.props.isOver) {
            let data = this.props.place.placeData;
            let message = (data == null? <span>Congrats on your treasure find.</span> :
                        <span>Congrats on your purchase of {data.city}, {data.country} (population {data.population}).</span>);
            return <div style={{height: '100%', width: '50%'}}>
                <h1>You Won!</h1>
                <h3>{message} You can now sort of say that you 'own the world.' Here are your stats:</h3>
                <Metrics metricData={this.props.metrics} />
                <button className="resetBtn" onClick={this.props.reset}>Play Again</button>
            </div>
        }
        else if (this.props.isInit) {
            let data = this.props.place.placeData;
            let placeName = data == null? <span></span> : <p>{data.city}, {data.country}<br />Population: {data.population}</p>
            let latDisplay = (this.props.place.lat > 0? String(this.props.place.lat).substring(0, 7) : String(this.props.place.lat).substring(1).substring(0, 7));
            let latHemisphere = (this.props.place.lat > 0? "N" : "S");
            let lngDisplay = (this.props.place.lng > 0? String(this.props.place.lng).substring(0, 7) : String(this.props.place.lng).substring(1).substring(0, 7));
            let lngHemisphere = (this.props.place.lng > 0? "E" : "W");
            return <div style={{height: '100%', width: '50%'}}>
                <p>You selected a location at coordinates {latDisplay}&deg;{latHemisphere}, {lngDisplay}&deg;{lngHemisphere}</p>
                {placeName}
                <Metrics metricData={this.props.metrics} />
            </div>;
        }
        else {
            return <div style={{height: '100%', width: '100%'}}>
                <h3>Welcome to a game of both chance and wits!</h3>
                <p>You're a newly minted billionaire seeking to "own the world." The objective here is to buy all the places shown by the markers on the map with the $1 billion provided. The game is split into levels, and if you go bankrupt trying to buy a place, you'll have to restart the level.</p>
                <p>The catch here is that the cost of a place is determined by its population, which a player with integrity wouldn't know until they click the marker to buy it. That's right! You're a billionaire who's investing blind for kicks.</p>
                <p>Click on a marker to start level {this.props.metrics.level} of the game.</p>
                <Metrics metricData={this.props.metrics} />
                <button onClick={this.props.onQuit}>Quit and Log Out</button>
            </div>;
        }
    }
}