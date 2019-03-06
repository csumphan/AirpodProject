import React, { Component } from 'react';
import './App.css';

import LandingPage from './container/Landing'
import StatsPage from './container/Stats'
// import Airpod from './AirPods_Vector.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.song1 = React.createRef()
  }
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}

export default App;
