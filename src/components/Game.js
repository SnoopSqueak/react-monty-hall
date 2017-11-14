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
      openDoors: Array(parseInt(numOfDoors, 10)).fill(false),
      firstChoice: null,
      numSwitches: 0,
      numStays: 0,
      numSwitchWins: 0,
      numStayWins: 0,
      numGamesPlayed: 0
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
    let topInfo = "";
    let buttonText = "Next";
    if (numOfClosedDoors === 0) {
      if (this.state.selectedDoor === this.state.prizeDoor) {
        topInfo = "Congratulations, you won!";
      } else {
        topInfo = "Aw, nuts! You lost.";
      }
      buttonText = "Again!";
    } else {
      topInfo = "There are " + numOfClosedDoors + " closed doors out of " + this.state.openDoors.length + ". The odds of randomly guessing the correct door right now are 1 in " + numOfClosedDoors + ", or about " + (Math.round((1 / numOfClosedDoors) * 100)) + "%:";
    }
    let switchPercent = Math.round(this.state.numSwitchWins / this.state.numSwitches * 100);
    let stayPercent = Math.round(this.state.numStayWins / this.state.numStays * 100);
    let gamesInfo = "You have played " + this.state.numGamesPlayed + ((this.state.numGamesPlayed === 1) ? " game" : " games") +  ".";
    let switchInfo = "You have never switched.";
    let stayInfo = "You have never stayed with your original choice.";
    let switchTotalPercent = Math.round(this.state.numSwitchWins / this.state.numGamesPlayed * 100);
    if (isNaN(switchTotalPercent)) switchTotalPercent = 0;
    let stayTotalPercent = Math.round(this.state.numStayWins / this.state.numGamesPlayed * 100);
    if (isNaN(stayTotalPercent)) stayTotalPercent = 0;
    let totalInfo = "Out of all the games you've won and lost, you won " + switchTotalPercent + "% by switching and " + stayTotalPercent + "% by staying.";
    if (this.state.numSwitches > 0) {
      switchInfo = "You chose to switch " + this.state.numSwitches + (this.state.numSwitches === 1 ? " time" : " times") + ", which resulted in victory " + switchPercent + "% of the time.";
    }
    if (this.state.numStays > 0) {
      stayInfo = "You chose to stay with your original choice " + this.state.numStays + (this.state.numStays === 1 ? " time" : " times") + ", which resulted in victory " + stayPercent + "% of the time.";
    }
    let button = (this.state.selectedDoor !== null) ? <button onClick={(e) => this.nextPhase(e)}>{buttonText}</button> : <button disabled="true">{buttonText}</button>;
    return (
      <section className="game">
        <div>Select number of doors for next game: <input id="door-num-input" type="text" defaultValue={this.state.openDoors.length}/></div>
        <div>{topInfo}</div>
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
        <br/>
        <div>{gamesInfo}</div>
        <br/>
        <div>{switchInfo}</div>
        <br/>
        <div>{stayInfo}</div>
        <br/>
        <div>{totalInfo}</div>
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
    let numOfDoors = document.getElementById("door-num-input").value;
    if (numOfDoors < Game.MIN_DOORS) {
      numOfDoors = Game.MIN_DOORS;
      document.getElementById("door-num-input").value = numOfDoors;
    } else if (numOfDoors > Game.MAX_DOORS) {
      numOfDoors = Game.MAX_DOORS;
      document.getElementById("door-num-input").value = numOfDoors;
    }

    this.setState({
      currentPhase: 0,
      prizeDoor: Math.floor((Math.random() * numOfDoors)),
      openDoors: Array(parseInt(numOfDoors, 10)).fill(false),
      selectedDoor: null,
      firstChoice: null,
      secondChoice: null
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
    this.setState({openDoors: doorsToOpen, firstChoice: this.state.selectedDoor});
    console.log("Chose not to reveal door number " + (doorToKeepShut+1) + "...");
  }

  openAll() {
    let newState = {openDoors: Array(this.state.openDoors.length).fill(true), numGamesPlayed: this.state.numGamesPlayed + 1};
    if (this.state.firstChoice !== this.state.selectedDoor) {
      newState.numSwitches = this.state.numSwitches + 1;
      if (this.state.selectedDoor === this.state.prizeDoor) {
        newState.numSwitchWins = this.state.numSwitchWins + 1;
      }
    } else {
      newState.numStays = this.state.numStays + 1;
      if (this.state.selectedDoor === this.state.prizeDoor) {
        newState.numStayWins = this.state.numStayWins + 1;
      }
    }
    this.setState(newState);
  }
}

Game.MAX_DOORS = 999;
Game.MIN_DOORS = 3;

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
