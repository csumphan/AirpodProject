import React, { Component } from 'react';
import './App.css';

import LandingPage from './container/Landing'

class App extends Component {
  constructor(props) {
    super(props)
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
