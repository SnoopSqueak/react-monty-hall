import React, { Component } from 'react';
import Door from './Door.js';

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      doors: [],
      phases: ["select", "openZonks", "switch", "openPrize"],
      currentPhase: 0
    }
  }

  render() {
    for (let i = 0; i < this.props.numOfDoors; i++) {
      let door = <Door number={i+1} clickHandler={this.clickDoor}/>;
      this.state.doors.push(door);
    }
    return (
      <section className="game">
        <div>{this.state.doors.length} Doors:</div>
        {
          this.state.doors.map((door,index) => {
            return (
              <span key={index}>
                {door}
              </span>
            );
          })
        }
      </section>
    );
  }

  clickDoor(e) {
    console.log("wat do");
    console.log(e.target.childNodes[0].innerText);
  }
}

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
