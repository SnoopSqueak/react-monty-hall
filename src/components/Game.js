import React, { Component } from 'react';
import Door from './Door.js';

class Game extends Component {
  render() {
    let doors = [];
    for (let i = 0; i < this.props.numOfDoors; i++) {
      doors.push(<Door/>);
    }
    return (
      <section class="game">
        <div>{this.props.numOfDoors}:</div>
        <div>{doors}</div>
      </section>
    );
  }
}

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
