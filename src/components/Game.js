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
    for (let i = 0; i < this.props.numOfDoors; i++) {
      this.state.doors.push(<Door number={i+1} onClick={this.clickDoor}/>);
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

  clickDoor() {
    console.log("wat do");
  }
}

Game.defaultProps = {
  numOfDoors: 30
}

export default Game;
