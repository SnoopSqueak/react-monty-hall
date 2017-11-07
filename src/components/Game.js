import React, { Component } from 'react';
import Door from './Door.js';
import $ from 'jquery';

class Game extends Component {
  constructor (props) {
    super(props);
    let numOfDoors = this.props.numOfDoors;
    if (numOfDoors < Game.minDoors) {
      numOfDoors = Game.minDoors;
    } else if (numOfDoors > Game.maxDoors) {
      numOfDoors = Game.maxDoors;
    }
    this.state = {
      phases: ["select", "openZonks", "switch", "openPrize"],
      currentPhase: 0,
      prizeDoor: Math.floor((Math.random() * this.props.numOfDoors)),
      numOfDoors: numOfDoors,
      selectedDoor: null
    };
    console.log("PRIZE DOOR IS " + this.state.prizeDoor);
  }

  render() {
    let doors = [];
    for (let i = 0; i < this.state.numOfDoors; i++) {
      if (this.state.selectedDoor !== null && this.state.selectedDoor === i) {
        doors.push(<Door number={i+1} clickHandler={(e) => this.clickDoor(e, i)} isSelected="true"/>);
      } else {
        doors.push(<Door number={i+1} clickHandler={(e) => this.clickDoor(e, i)}/>);
      }
    }
    return (
      <section className="game">
        <div>{doors.length} Doors:</div>
        {
          doors.map((door,index) => {
            return (
              <span key={index}>
                {door}
              </span>
            );
          })
        }
        <div><button onClick={(e) => this.nextPhase(e)}>Next</button></div>
      </section>
    );
  }

  clickDoor(e, i) {
    e.preventDefault();
    console.log("Clicked on door #" + (i + 1));
    this.setState({selectedDoor: i});
    console.log("Set selectedDoor = " + this.state.selectedDoor);
  }

  nextPhase() {
    let tempPhase = this.state.currentPhase + 1;
    while (tempPhase >= this.state.phases.length) {
      tempPhase -= this.state.phases.length;
    }
    console.log("Beginning " + this.state.phases[tempPhase] + " phase...");
    this.setState({phase: tempPhase});
  }
}

Game.maxDoors = 999;
Game.minDoors = 3;

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
