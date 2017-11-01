import React, { Component } from 'react';
import Door from './Door.js';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      doors: []
    }
  }

  render() {
    this.state.doors = [];
    for (let i = 0; i < this.props.numOfDoors; i++) {
      this.state.doors.push(<Door number={i+1} onClick={this.clickDoor}/>);
    }
    return (
      <section class="game">
        <div>{this.state.doors.length} Doors:</div>
        <div>{this.state.doors}</div>
      </section>
    );
  }
}

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
