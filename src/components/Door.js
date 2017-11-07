import React, { Component } from 'react';

class Door extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasPrize: false,
      isOpen: false
    };
  }

  render() {
    let classes = "door";
    if (this.state.isOpen) {
      classes += " door-open";
      if (this.state.hasPrize) {
        classes += " door-prize";
      } else {
        classes += " door-zonk";
      }
    } else {
      classes += " door-closed";
    }
    if (this.props.isSelected) {
      classes += " door-selected"
    }
    return (
      <div className={classes} onClick={this.props.clickHandler}>
        <span className="door-number">{this.props.number}</span>
      </div>
    );
  }
}

Door.defaultProps = {
  number: 0,
  isSelected: false,
  clickHandler: () => {
    console.log("No click handler has been set up for this door.");
  }
}

export default Door;
