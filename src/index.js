import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Game';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAiw4SHAIlf53C2leMA3q4F-r3jRJt1SC8",
    authDomain: "comp-426-final-b5799.firebaseapp.com",
    projectId: "comp-426-final-b5799",
    storageBucket: "comp-426-final-b5799.appspot.com",
    messagingSenderId: "272040014494",
    appId: "1:272040014494:web:b17bc8da100c4e77d8c18f",
    measurementId: "G-FB8ZYMPB4H"
};

initializeApp(config);

getAuth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    setup();
  } else {
    uid = null;
    login(null);
  }
});

let game;
let currPlaces;
let currPlace;
let uid = null;
login(null);

function login(message) {
  ReactDOM.render(
    <React.StrictMode>
      <div className="login">
        <h1>Log in or create an account for your chance to OWN THE WORLD!</h1>
        <div>
          <label>
            Email
          </label>
          <input id="emailInput"></input>
          <br />
          <br />
          <label>
            Password
          </label>
          <input id="pwInput"></input>
          <br />
          <button className="okBtn" onClick={() => {
            signIn();
            login("Attempting to log in. If this message persists, log in failed.");
          }}>Log In</button>
          <button className="dangerBtn" onClick={() => {
            createAccount();
            login("Attempting to create account. If this message persists, account creation failed.");
          }}>Create Account</button>
          {message == null? <span></span> : <p className="errorMessage">{message}</p>}
        </div>
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function signIn() {
  let email = String(document.getElementById("emailInput").value).trim();
  let password = String(document.getElementById("pwInput").value).trim();
  if (email.length == 0 || password.length == 0) {
    return;
  }
  signInWithEmailAndPassword(getAuth(), email, password).catch((error) => {
    let errorMessage = error.message;
  });
}

function logout() {
  signOut(getAuth());
}

function createAccount() {
  let email = String(document.getElementById("emailInput").value).trim();
  let password = String(document.getElementById("pwInput").value).trim();
  if (email.length == 0 || password.length == 0) {
    return;
  }
  createUserWithEmailAndPassword(getAuth(), email, password)
    .catch((error) => {
      let errorMessage = error.message;
    });
}

const gameConverter = {
  toFirestore: (g) => {
      return {
          level: g.level,
          currLvlIdx: g.currLvlIdx,
          currLvlPlaces: g.currLvlPlaces,
          isLvlInit: g.isLvlInit,
          numOwned: g.numOwned,
          startCredits: g.startCredits,
          currentCredits: g.currentCredits,
          places: g.places,
      };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      const gameConfig = {
        level: data.level,
        currLvlIdx: data.currLvlIdx,
        currLvlPlaces: data.currLvlPlaces,
        isLvlInit: data.isLvlInit,
        numOwned: data.numOwned,
        startCredits: data.startCredits,
        currentCredits: data.currentCredits,
        places: data.places,
      }
      return new Game(gameConfig);
  }
};

async function setup() {
  const docRef = doc(getFirestore(), "users", uid);
  const docSnap = await getDoc(docRef.withConverter(gameConverter));
  if (docSnap.exists()) {
      game = docSnap.data();
  }
  else {
      game = new Game(null);
  }
  currPlaces = [];
  currPlace = null;
  game.addPlaceReadyListener((placeInfo, index) => completeTurn(placeInfo, index));
  prepareLevel();
}

function prepareLevel() {
  currPlaces = game.places.slice(game.currLvlIdx, game.currLvlIdx + game.currLvlPlaces);
  startTurn();
}

function startTurn() {
  ReactDOM.render(
    <React.StrictMode>
      <App 
        onMapAction={(place) => {
          if (!game.isOver) {
            currPlace = place;
            game.findPlaceData(place);
          }
        }}
        isInit={game.isLvlInit}
        isOver={game.isOver}
        currPlaces={currPlaces}
        place={currPlace}
        metrics={game.getMetrics()}
        onChange={startTurn}
        reset={resetGame}
        onQuit={logout}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function completeTurn(placeInfo, index) {
  let isBankrupt = (placeInfo == null? game.addTreasure(index) : game.addPlace(index, placeInfo));
  if (isBankrupt) {
    showBankrupt(placeInfo);
  }
  else if (game.numOwned == game.places.length) {
    endGame();
  }
  else {
    currPlace.placeData = placeInfo;
    game.checkLevelOver()? showLevelChange(placeInfo): startTurn();
  }
}

function showBankrupt(placeInfo) {
  ReactDOM.render(
    <React.StrictMode>
      <div className="transition failure">
        <h1>You went bankrupt trying to buy {placeInfo.city}, {placeInfo.country} (population {placeInfo.population})!</h1>
        <button className="dangerBtn" onClick={startTurn}>Retry Level</button>
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function showLevelChange(placeInfo) {
  updateDB();
  let message = placeInfo == null? <h1>You leveled up after finding treasure!</h1> :
                <h1>You leveled up after buying {placeInfo.city}, {placeInfo.country} (population {placeInfo.population})!</h1>;
  ReactDOM.render(
    <React.StrictMode>
      <div className="transition success">
        {message}
        <button className="okBtn" onClick={prepareLevel}>Continue</button>
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

async function updateDB() {
  const ref = doc(getFirestore(), "users", uid).withConverter(gameConverter);
  await setDoc(ref, game);
}

async function deleteFromDB() {
  await deleteDoc(doc(getFirestore(), "users", uid));
}

function endGame() {
  game.isOver = true;
  startTurn();
}

function resetGame() {
  if (game.level > 1) {
    deleteFromDB();
  }
  game.resetGame();
  setup();
}