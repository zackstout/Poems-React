
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CreatePoem from './CreatePoem/CreatePoem.js';
import PoemsFeed from './PoemsFeed/PoemsFeed.js';

class App extends Component {

  constructor() {
    super();

    this.state = {
      poems: []
    };
  };

  getPoems = () => {
    axios.get('/poems/feed')
    .then(res => {
      console.log(res);
      this.setState({poems: res.data});
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  componentDidMount() {
    this.getPoems();
  }

  render() {
    return (
      <div className="App">
        <p>
          Let's make some fuckin poems!
        </p>

        <PoemsFeed poems={this.state.poems}/>
        <br/>
        <CreatePoem getPoems={this.getPoems}/>
      </div>
    );
  }
}

export default App;
