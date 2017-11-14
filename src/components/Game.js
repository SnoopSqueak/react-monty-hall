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

    let doors = this.generateDoors(numOfDoors);

    this.state = {
      currentPhase: 0,
      selectedDoor: null,
      phases: ["closeAll", "openZonks", "openAll"],
      doors: doors,
      firstChoice: null,
      numSwitches: 0,
      numStays: 0,
      numSwitchWins: 0,
      numStayWins: 0,
      numGamesPlayed: 0
    };
  }

  generateDoors(numOfDoors) {
    let doors = [];
    let prizeIndex = Math.floor((Math.random() * numOfDoors));
    console.log("Generated prize behind door #" + (prizeIndex + 1) + " (array index " + prizeIndex + ")");
    for (var i = 0; i < numOfDoors; i++) {
      if (prizeIndex === i) {
        doors.push({content: "prize", isOpen: false});
      } else {
        let randNum = (Math.floor(Math.random() * 9) + 1);
        if (randNum >= 5) {
          randNum = 1;
        } else if (randNum >= 2) {
          randNum = 2;
        } else {
          randNum = 3;
        }
        doors.push({content: "zonk zonk" + randNum, isOpen: false});
      }
    };
    return doors;
  }

  render() {
    //console.log("RENDERING: " + JSON.stringify(this.state));
    let doors = [];
    let numOfClosedDoors = 0;
    this.state.doors.forEach((door, i) => {
      //console.log("Rendering this door: " + JSON.stringify(door));
      if (!door.isOpen) numOfClosedDoors++;
      let isSelected = (this.state.selectedDoor !== null && this.state.selectedDoor === i);
      doors.push(<Door number={i+1} clickHandler={(e) => this.clickDoor(e, i)} isSelected={isSelected} isOpen={door.isOpen} content={door.content}/>);
    });

    let topInfo = "";
    let buttonText = "Next";
    if (numOfClosedDoors === 0) {
      if (this.state.doors[this.state.selectedDoor].content === "prize") {
        topInfo = "Congratulations, you won!";
      } else {
        topInfo = "Aw, nuts! You lost.";
      }
      buttonText = "Again!";
    } else {
      topInfo = "There are " + numOfClosedDoors + " closed doors out of " + this.state.doors.length + ". The odds of randomly guessing the correct door right now are 1 in " + numOfClosedDoors + ", or about " + (Math.round((1 / numOfClosedDoors) * 100)) + "%:";
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
        <div>Select number of doors for next game: <input id="door-num-input" type="text" defaultValue={this.state.doors.length}/></div>
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
    if (this.state.doors[i].isOpen) return;
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

    let doors = this.generateDoors(numOfDoors);

    this.setState({
      currentPhase: 0,
      doors: doors,
      selectedDoor: null,
      firstChoice: null,
      secondChoice: null
    });
  }

  openZonks() {
    let doorToKeepShut;
    if (this.state.doors[this.state.selectedDoor].content === "prize") {
      doorToKeepShut = Math.floor(Math.random() * (this.state.doors.length - 1));
      if (doorToKeepShut >= this.state.selectedDoor) {
        doorToKeepShut++;
      }
    } else {
      this.state.doors.forEach((door, index) => {
        if (door.content === "prize") {
          doorToKeepShut = index;
          return;
        }
      });
    }

    let newDoors = [];
    for (var i = 0; i < this.state.doors.length; i++) {
      newDoors.push({content: this.state.doors[i].content, isOpen: (i !== doorToKeepShut && i !== this.state.selectedDoor)});
    }

    this.setState({doors: newDoors, firstChoice: this.state.selectedDoor});
    console.log("Chose not to reveal door number " + (doorToKeepShut+1) + "...");
    //console.log("Current state: " + JSON.stringify(this.state.doors));
    //console.log("New doors: " + JSON.stringify(newDoors));
  }

  openAll() {
    let newDoors = this.state.doors;
    newDoors.forEach((door) => {
      door.isOpen = true;
    });
    let newState = {doors: newDoors, numGamesPlayed: this.state.numGamesPlayed + 1};
    if (this.state.firstChoice !== this.state.selectedDoor) {
      newState.numSwitches = this.state.numSwitches + 1;
      if (this.state.doors[this.state.selectedDoor].content === "prize") {
        newState.numSwitchWins = this.state.numSwitchWins + 1;
      }
    } else {
      newState.numStays = this.state.numStays + 1;
      if (this.state.doors[this.state.selectedDoor].content === "prize") {
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
