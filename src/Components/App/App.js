
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CreatePoem from './CreatePoem/CreatePoem.js';

class App extends Component {

  constructor() {
    super();

    this.state = {

    };
    
    this.pingDB = this.pingDB.bind(this);

  };

  pingDB() {
    console.log('pinging');
    axios.get('/poems')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response);
    })
  }


  render() {
    return (
      <div className="App">

        <p>
          Let's make some fuckin poems!
        </p>

        <CreatePoem pingDB = {this.pingDB} />

      </div>
    );
  }
}

export default App;
