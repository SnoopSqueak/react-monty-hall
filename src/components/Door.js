import React, { Component } from 'react';

class Door extends Component {
  render() {
    if (this.props.open) {
      if (this.props.hasPrize) {
        return (
          <div className="door door-open door-prize">
            <span className="door-number">{this.props.number}</span>
          </div>
        );
      } else {
        return (
          <div className="door door-open door-zonk">
            <span className="door-number">{this.props.number}</span>
          </div>
        );
      }
    } else {
      return (
        <div className="door door-closed">
          <span className="door-number">{this.props.number}</span>
        </div>
      );
    }
  }
}

Door.defaultProps = {
  number: 0,
  hasPrize: false,
  open: false
}

export default Door;
