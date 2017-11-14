import React, { Component } from 'react';

class Door extends Component {
  constructor(props) {
    super(props);
    let randNum = (Math.floor(Math.random() * 6) + 1);
    if (randNum >= 3) {
      randNum = 1;
    } else if (randNum > 1) {
      randNum = 2;
    } else {
      randNum = 3;
    }
    this.state = {
      variation: randNum
    }
  }

  render() {
    let doorClass = this.props.isOpen ? "door-open" : "door-closed";
    let prizeClass = this.props.hasPrize ? "prize" : "zonk zonk" + this.state.variation;
    let parentClass = "door";
    if (this.props.isSelected) parentClass += " door-selected";
    if (!this.props.isOpen) {
      prizeClass += " hidden";
    }

    return (
      <div className={parentClass} onClick={this.props.clickHandler}>
        <div className={prizeClass}>
        </div>
        <div className={doorClass}>
        </div>
        <span className="door-number noselect">{this.props.number}</span>
      </div>
    );
  }
}

Door.defaultProps = {
  number: 0,
  isSelected: false,
  hasPrize: false,
  isOpen: false,
  clickHandler: () => {
    console.log("No click handler has been set up for this door.");
  }
}

export default Door;
