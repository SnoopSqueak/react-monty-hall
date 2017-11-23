import React, { Component } from 'react';

class Door extends Component {
  render() {
    let doorClass = this.props.isOpen ? "door door-open" : "door door-closed";
    let prizeClass = this.props.content;
    let parentClass = "door-container";
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
  content: "zonk1",
  isOpen: false,
  clickHandler: () => {
    console.log("No click handler has been set up for this door.");
  }
}

export default Door;
