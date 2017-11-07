import React, { Component } from 'react';

class Door extends Component {
  render() {
    if (this.props.open) {
      if (this.props.hasPrize) {
        return (
          <div className="door door-open door-prize" onClick={this.props.clickHandler}>
            <span className="door-number">{this.props.number}</span>
          </div>
        );
      } else {
        return (
          <div className="door door-open door-zonk" onClick={this.props.clickHandler}>
            <span className="door-number">{this.props.number}</span>
          </div>
        );
      }
    } else {
      return (
        <div className="door door-closed" onClick={this.props.clickHandler}>
          <span className="door-number">{this.props.number}</span>
        </div>
      );
    }
  }
}

Door.defaultProps = {
  number: 0,
  hasPrize: false,
  open: false,
  clickHandler: () => {
    console.log("No click handler has been set up for this door.");
  }
}

export default Door;
