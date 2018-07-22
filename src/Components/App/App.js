
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

  cleanPoems = (poem_lines) => {
    let res = [];
    let prevLine = poem_lines[0];
    let lines = [];
    for (let i=0; i < poem_lines.length; i++) {
      const line = poem_lines[i];
      if (prevLine.user_poem_id !== line.user_poem_id) {
        // Start a new poem:
        res.push({
          author: prevLine.author,
          title: prevLine.title,
          id: prevLine.user_poem_id,
          lines: lines
        });
        lines = [line.line];
        prevLine = line;
      } else {
        // Continue a poem:
        lines.push(line.line);
      }
      // Last poem:
      if (i == poem_lines.length - 1) {
        res.push({
          author: prevLine.author,
          title: prevLine.title,
          id: prevLine.user_poem_id,
          lines: lines
        });
      }
    }
    console.log(res);
    return res;
  }

  getPoems = () => {
    axios.get('/poems/feed')
    .then(res => {
      console.log(res);
      const cleanedPoems = this.cleanPoems(res.data);
      this.setState({poems: cleanedPoems});
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
