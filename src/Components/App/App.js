
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CreatePoem from './CreatePoem/CreatePoem.js';
import PoemsFeed from './PoemsFeed/PoemsFeed.js';

class App extends Component {

  constructor() {
    super();

    this.state = {

    };
  };


  render() {
    return (
      <div className="App">
        <p>
          Let's make some fuckin poems!
        </p>

        <PoemsFeed />
        <br/>
        <CreatePoem />
      </div>
    );
  }
}

export default App;
