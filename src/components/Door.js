import React, { Component } from 'react';
import closedDoor from '../images/door_closed.png';

class Door extends Component {
  render() {
    return (
      <div class="door door-closed">
        <span class="door-number">{this.props.number}</span>
      </div>
    );
  }
}

Door.defaultProps = {
  number: 0
}

export default Door;
