import axios from 'axios';

export default class Game {
    constructor(gameConfig) {
        gameConfig != null? this.loadGame(gameConfig) : this.resetGame();
    }

    loadGame = (gameConfig) => {
        this.level = gameConfig.level;
        this.currLvlIdx = gameConfig.currLvlIdx;
        this.currLvlPlaces = gameConfig.currLvlPlaces;
        this.isLvlInit = gameConfig.isLvlInit;
        this.numOwned = gameConfig.numOwned;
        this.startCredits = gameConfig.startCredits;
        this.currentCredits = gameConfig.currentCredits;
        this.places = gameConfig.places;
        this.placeReadyListeners = [];
        this.isOver = false;
    }

    resetGame = () => {
        this.level = 1;
        this.currLvlIdx = 0;
        this.currLvlPlaces = 5;
        this.isLvlInit = false;
        this.numOwned = 0;
        this.startCredits = 1000000000;
        this.currentCredits = this.startCredits;
        this.places = [];
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j < 5 + i; j++) {
                this.places.push({
                    lat: Number(Math.round(Math.random() * 120 * 10000000)) / 10000000 - 50,
                    lng: Number(Math.round(Math.random() * 360 * 10000000)) / 10000000 - 180,
                    placeData: null,
                    isOwned: false,
                    isTreasure: false,
                    lvl: i,
                    index: (i - 1) * j,
                });
            }
        }
        this.placeReadyListeners = [];
        this.isOver = false;
    }

    resetPlace = (idx) => {
        this.places[idx].lat = Number(Math.round(Math.random() * 120 * 10000000)) / 10000000 - 50;
        this.places[idx].lng = Number(Math.round(Math.random() * 360 * 10000000)) / 10000000 - 180;
        this.places[idx].placeData = null;
        this.places[idx].isOwned = false;
        this.places[idx].isTreasure = false;
    }

    addPlaceReadyListener = (listener) => {
        this.placeReadyListeners.push(listener);
    }

    levelUp = () => {
        this.currLvlIdx = this.currLvlIdx += this.currLvlPlaces;
        this.level++;
        this.currLvlPlaces++;
        this.isLvlInit = false;
        this.startCredits = this.currentCredits;
    }

    resetLevel = () => {
        this.currentCredits = this.startCredits;
        this.isLvlInit = false;
        for (let i = this.currLvlIdx; i < this.currLvlIdx + this.currLvlPlaces; i++) {
            this.resetPlace(i);
        }
        this.numOwned = this.currLvlIdx;
    }

    indexToIdx = (index) => {
        for (let idx = 0; idx < this.places.length; idx++) {
            if (this.places[idx].index == index) {
                return idx;
            }
        }
        return -1;
    }

    findPlaceData = async (place) => {
        let latFormat = String(place.lat);
        let lngFormat = String(place.lng);
        let latDecStart = latFormat.indexOf(".") + 1;
        let latDecs = latFormat.substring(latDecStart).length;
        while (latDecs < 6) {
            latFormat = latFormat + "0";
            latDecs++;
        }
        if (latDecs > 6) {
            latFormat = latFormat.substring(0, latDecStart + 6);
        }
        let lngDecStart = lngFormat.indexOf(".") + 1;
        let lngDecs = lngFormat.substring(lngDecStart).length;
        while (lngDecs < 6) {
            lngFormat = lngFormat + "0";
            lngDecs++;
        }
        if (lngDecs > 6) {
            lngFormat = lngFormat.substring(0, lngDecStart + 6);
        }

        if (place.lng > 0) {
            lngFormat = '+' + lngFormat;
        }
        if (lngFormat[4] != '.') {
            lngFormat = lngFormat.substring(0, 1) + '0' + lngFormat.substring(1);
        }
        const placeResponse = (await axios({
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/' + latFormat + lngFormat + '/nearbyCities',
            params: {
                limit: '1',
                minPopulation: '1000',
                radius: '100',
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        })).data;
        this.placeReadyListeners.map((listener) => {
            listener(placeResponse.data.length > 0? placeResponse.data[0] : null, place.index)
        });
    }

    verbalAlert = async (message) => {
        message = String(message);
        const verbalResponse = await axios({
            method: 'GET',
            url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
            params: {
              key: process.env.REACT_APP_VOICE_RSS_API_KEY,
              hl: 'en-us',
              src: {message},
              f: '8khz_8bit_mono',
              c: 'mp3',
              r: '0'
            },
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com'
            },
            responseType: 'blob',
        });
        if (verbalResponse.status == 200) {
            const mp3 = new Blob([verbalResponse.data], { type: 'audio/mp3' });
            const url = window.URL.createObjectURL(mp3);
            const audio = new Audio(url);
            audio.load();
            await audio.play();
        }
    }

    addTreasure = (index) => {
        this.verbalAlert("Treasure!");
        let idx = this.indexToIdx(index);
        this.isLvlInit = true;
        this.numOwned++;
        this.places[idx].isTreasure = true;
        this.currentCredits += 10000000;
        return false;
    }

    addPlace = (index, data) => {
        let idx = this.indexToIdx(index);
        this.isLvlInit = true;
        this.places[idx].placeData = data;
        this.numOwned++;
        this.currentCredits -= data.population * 10000;
        if (this.currentCredits < 0) {
            this.resetLevel();
            return true;
        }
        else {
            this.getGift();
            return false;
        }
    }

    getGift = () => {
        let giftingPlaces = this.places.filter((place) => (place.isOwned && !place.isTreasure && place.placeData != null));
        if (giftingPlaces.length > 0) {
            this.currentCredits +=
                giftingPlaces[Math.floor(Math.random() * giftingPlaces.length)].placeData.population * 10000;
        }
    }

    getMetrics = () => {
        return {
            level: this.level,
            numOwned: this.numOwned,
            credits: this.currentCredits,
        };
    }

    checkLevelOver = () => {
        for (let i = this.currLvlIdx; i < this.currLvlIdx + this.currLvlPlaces; i++) {
            if (!this.places[i].isOwned) {
                return false;
            }
        }
        this.levelUp();
        return true;
    }
}