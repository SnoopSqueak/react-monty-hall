import React, { Component } from 'react';
import Door from './Door.js';

class Game extends Component {
  constructor (props) {
    super(props);
    let numOfDoors = this.props.numOfDoors;
    if (numOfDoors < Game.MIN_DOORS) {
      numOfDoors = Game.MIN_DOORS;
    } else if (numOfDoors > Game.MAX_DOORS) {
      numOfDoors = Game.MAX_DOORS;
    }
    this.state = {
      currentPhase: 0,
      prizeDoor: Math.floor((Math.random() * this.props.numOfDoors)),
      selectedDoor: null,
      phases: ["firstChoice", "openZonks", "secondChoice", "openAll"],
      openDoors: [],
      numOfDoors: numOfDoors
    };
    console.log("PRIZE DOOR IS AT INDEX " + this.state.prizeDoor);
  }

  render() {
    console.log("RENDERING: " + JSON.stringify(this.state));
    let doors = [];
    for (let i = 0; i < this.state.numOfDoors; i++) {
      let isSelected = (this.state.selectedDoor !== null && this.state.selectedDoor === i);
      let isOpen = this.state.openDoors.includes(i);
      doors.push(<Door number={i+1} clickHandler={(e) => this.clickDoor(e, i)} isSelected={isSelected} isOpen={isOpen}/>);
    }
    let button = (this.state.selectedDoor !== null) ? <button onClick={(e) => this.nextPhase(e)}>Next</button> : <button disabled="true">Next</button>
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
        <div>{button}</div>
      </section>
    );
  }

  clickDoor(e, i) {
    e.preventDefault();
    console.log("Clicked on door #" + (i + 1));
    if (this.state.openDoors.includes(i)) return;
    this.setState({selectedDoor: i});
    console.log("Set selectedDoor index = " + i);
  }

  nextPhase() {
    let tempPhase = this.state.currentPhase + 1;
    while (tempPhase >= this.state.phases.length) {
      tempPhase -= this.state.phases.length;
    }
    this.setState({currentPhase: tempPhase});
    switch (this.state.phases[tempPhase]) {
      case "firstChoice": this.resetGame(); break;
      case "openZonks": this.openZonks(); break;
      default: console.log("Unrecognized state '" + this.state.phases[tempPhase] + "'.");
    }
  }

  resetGame() {
    this.setState({
      currentPhase: 0,
      prizeDoor: Math.floor((Math.random() * this.props.numOfDoors)),
      openDoors: [],
      selectedDoor: null
    });
    console.log("PRIZE DOOR IS AT INDEX " + this.state.prizeDoor);
  }

  openZonks() {
    let doorToKeepShut;
    if (this.state.selectedDoor === this.state.prizeDoor) {
      doorToKeepShut = Math.floor(Math.random() * (this.props.numOfDoors - 1));
      if (doorToKeepShut >= this.state.selectedDoor) {
        doorToKeepShut++;
      }
    } else {
      doorToKeepShut = this.state.prizeDoor;
    }
    let doorsToOpen = [];
    for (var i = 0; i < this.state.numOfDoors; i++) {
      if (i !== doorToKeepShut && i !== this.state.selectedDoor) {
        doorsToOpen.push(i);
      }
    }
    this.setState({openDoors: doorsToOpen});
    console.log("Chose not to reveal door number " + (doorToKeepShut+1) + "...");
  }
}

Game.MAX_DOORS = 999;
Game.MIN_DOORS = 3;

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
