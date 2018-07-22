
import React, { Component } from 'react';
import axios from 'axios';

import PoemCreationInput from './PoemCreationInput/PoemCreationInput.js';
import PoemEditing from './PoemEditing/PoemEditing.js';
import SourcePoems from './SourcePoems/SourcePoems.js';

class CreatePoem extends Component {

  constructor() {
    super();
    this.state = {

    };
  
  };

  termSearch = (term) => {
    console.log('hi ', term);
    axios.get(`/poems/term/${term}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  randomSearch = () => {
    console.log('pinging random search ...');
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
      <div>

        <br/>
        <PoemCreationInput termSearch={this.termSearch} randomSearch={this.randomSearch}/>
        <br />
        <PoemEditing />
        <br />
        <SourcePoems />

      </div>
    );
  }
}

export default CreatePoem;
