
import React, { Component } from 'react';
import axios from 'axios';

import PoemCreationInput from './PoemCreationInput/PoemCreationInput.js';
import PoemEditing from './PoemEditing/PoemEditing.js';
import SourcePoems from './SourcePoems/SourcePoems.js';

const TERM_LENGTH = 10; // It's ugly that we're also setting RANDOM_LENGTH in the router

class CreatePoem extends Component {

  constructor() {
    super();

    this.state = {
      sourceLines: [],
      poemEditing: {
        lines: [],
        author: '',
        createdAt: 0,
        title: ''
      },
      lineID: 0
    };
  }


  termSearch = (term) => {
    console.log('hi ', term);
    axios.get(`/poems/term/${term}`)
      .then(res => {
        console.log("res is ", res);
        // There is cleaner way to do this with new array and map:
        let random_indices = [];
        for (let i = 0; i < TERM_LENGTH; i++) {
          random_indices.push(Math.floor(Math.random() * res.data.length));
        }
        // console.log('indices are', random_indices);
        const filtered_poems = res.data.filter((d, ind) => random_indices.includes(ind));
        // console.log("filtered are ", filtered_poems);
        this.setState({ sourceLines: filtered_poems });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  randomSearch = () => {
    console.log('pinging random search ...');
    axios.get('/poems/random')
      .then(res => {
        console.log(res);
        this.setState({ sourceLines: res.data.slice(0, 10) });
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  addLine = (line) => {
    const poemEditing = { ...this.state.poemEditing };
    line.lineID = this.state.lineID;
    this.setState({ lineID: this.state.lineID + 1 });

    poemEditing.lines = poemEditing.lines.concat(line);
    this.setState({ poemEditing: poemEditing });
  }

  removeLine = (line) => {
    const poemEditing = { ...this.state.poemEditing };

    let ind;
    for (let i = 0; i < poemEditing.lines.length; i++) {
      if (poemEditing.lines[i].lineID == line.lineID) {
        ind = i;
        break;
      }
    }
    poemEditing.lines.splice(ind, 1);
    this.setState({ poemEditing: poemEditing });
  }

  moveLine = (line, direction) => {
    const poemEditing = { ...this.state.poemEditing };

    let ind;
    for (let i = 0; i < poemEditing.lines.length; i++) {
      if (poemEditing.lines[i].lineID == line.lineID) {
        ind = i;
        break;
      }
    }

    if (direction == 'up' && ind == 0 || direction == 'down' && ind == poemEditing.lines.length - 1) return;

    const movingElement = poemEditing.lines[ind];
    console.log(direction, ind, movingElement, poemEditing.lines, line);

    if (direction == 'up') {
      const temp = poemEditing.lines[ind - 1];
      poemEditing.lines[ind - 1] = movingElement;
      poemEditing.lines[ind] = temp;
    } else {
      const temp = poemEditing.lines[ind + 1];
      poemEditing.lines[ind + 1] = movingElement;
      poemEditing.lines[ind] = temp;
    }
    this.setState({ poemEditing: poemEditing });
  }

  submitPoem = (author, title) => {
    console.log(author, title, this.state.poemEditing.lines);
    const poemInfo = {
      author: author,
      title: title,
      lines: this.state.poemEditing.lines
    }
    axios.post('/poems', poemInfo)
      .then(res => {
        console.log(res);
        // Clear out lines:
        const poemEditing = { ...this.state.poemEditing };
        poemEditing.lines = [];
        this.setState({ poemEditing: poemEditing });
        this.props.getPoems();
      })
      .catch(err => {
        console.log(err.response);
      })
  }


  render() {
    return (
      <div>

        <br />
        <PoemCreationInput termSearch={this.termSearch} randomSearch={this.randomSearch} />
        <br />
        <PoemEditing submitPoem={this.submitPoem} moveLine={this.moveLine} removeLine={this.removeLine} poemEditing={this.state.poemEditing} />
        <br />
        <SourcePoems addLine={this.addLine} sourceLines={this.state.sourceLines} />

      </div>
    );
  }
}

export default CreatePoem;
