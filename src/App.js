import React, { Component } from 'react';
import './App.css';
import './styles/game.css';
import Game from './components/Game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game numOfDoors="10"/>
      </div>
    );
  }
}

export default App;
