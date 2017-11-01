import React, { Component } from 'react';
import closedDoor from '../images/door_closed.png';

class Door extends Component {
  render() {
    return (
      <img class="door door-closed" alt="Closed door" src={closedDoor}/>
    );
  }
}

export default Door;
