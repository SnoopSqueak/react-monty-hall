import React, { Component } from 'react';
import Door from './Door.js';

class Game extends Component {
  render() {
    return (
      <div class="game">
        <Door/>
        <Door/>
        <Door/>
      </div>
    );
  }
}

export default Game;
