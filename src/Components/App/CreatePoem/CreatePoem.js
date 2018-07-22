
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
    };
  
  };

  termSearch = (term) => {
    console.log('hi ', term);
    axios.get(`/poems/term/${term}`)
    .then(res => {
      console.log("res is ", res);
      // There is cleaner way to do this with new array and map:
      let random_indices = [];
      for (let i=0; i < TERM_LENGTH; i++) {
        random_indices.push(Math.floor(Math.random() * res.data.length));
      }
      console.log('indices are', random_indices);
      const filtered_poems = res.data.filter((d, ind) => random_indices.includes(ind));
      console.log("filtered are ", filtered_poems);
      this.setState({sourceLines: filtered_poems});
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
      this.setState({sourceLines: res.data});
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  render() {
    return (
      <div>

        <br/>
        <PoemCreationInput termSearch={this.termSearch} randomSearch={this.randomSearch}/>
        <br />
        <PoemEditing />
        <br />
        <SourcePoems sourceLines={this.state.sourceLines}/>

      </div>
    );
  }
}

export default CreatePoem;
