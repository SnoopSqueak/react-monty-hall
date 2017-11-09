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
      prizeDoor: Math.floor((Math.random() * numOfDoors)),
      selectedDoor: null,
      phases: ["closeAll", "openZonks", "openAll"],
      openDoors: Array(parseInt(numOfDoors, 10)).fill(false)
    };
  }

  render() {
    console.log("RENDERING: " + JSON.stringify(this.state));
    let doors = [];
    let numOfClosedDoors = 0;
    for (let i = 0; i < this.state.openDoors.length; i++) {
      let isSelected = (this.state.selectedDoor !== null && this.state.selectedDoor === i);
      let isOpen = this.state.openDoors[i];
      if (!isOpen) numOfClosedDoors++;
      let hasPrize = this.state.prizeDoor === i;
      doors.push(<Door number={i+1} clickHandler={(e) => this.clickDoor(e, i)} isSelected={isSelected} isOpen={isOpen} hasPrize={hasPrize}/>);
    }
    let info = "";
    let buttonText = "Next";
    if (numOfClosedDoors === 0) {
      if (this.state.selectedDoor === this.state.prizeDoor) {
        info = "Congratulations, you won!";
      } else {
        info = "Aw, nuts! You lost.";
      }
      buttonText = "Again!";
    } else {
      info = "There are " + numOfClosedDoors + " out of " + this.state.openDoors.length + " closed doors. The odds of randomly guessing the correct door right now are 1 in " + numOfClosedDoors + ", or about " + (Math.round((1 / numOfClosedDoors) * 100)) + "%:";
    }
    let button = (this.state.selectedDoor !== null) ? <button onClick={(e) => this.nextPhase(e)}>{buttonText}</button> : <button disabled="true">{buttonText}</button>;
    return (
      <section className="game">
        <div>{info}</div>
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
    if (this.state.openDoors[i]) return;
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
      case "closeAll": this.resetGame(); break;
      case "openZonks": this.openZonks(); break;
      case "openAll": this.openAll(); break;
      default: console.log("Unrecognized phase '" + this.state.phases[tempPhase] + "'.");
    }
  }

  resetGame() {
    this.setState({
      currentPhase: 0,
      prizeDoor: Math.floor((Math.random() * this.state.openDoors.length)),
      openDoors: Array(parseInt(this.state.openDoors.length, 10)).fill(false),
      selectedDoor: null
    });
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
    for (var i = 0; i < this.state.openDoors.length; i++) {
      if (i !== doorToKeepShut && i !== this.state.selectedDoor) {
        doorsToOpen.push(true);
      } else {
        doorsToOpen.push(false);
      }
    }
    this.setState({openDoors: doorsToOpen});
    console.log("Chose not to reveal door number " + (doorToKeepShut+1) + "...");
  }

  openAll() {
    this.setState({openDoors: Array(this.state.openDoors.length).fill(true)});
  }
}

Game.MAX_DOORS = 999;
Game.MIN_DOORS = 3;

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
