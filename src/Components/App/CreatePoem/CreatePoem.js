
import React, { Component } from 'react';
import PoemCreationInput from './PoemCreationInput/PoemCreationInput.js';
import PoemEditing from './PoemEditing/PoemEditing.js';
import SourcePoems from './SourcePoems/SourcePoems.js';

class CreatePoem extends Component {

  constructor() {
    super();
    this.state = {

    };
    
    this.randomSearch = this.randomSearch.bind(this);
    this.termSearch = this.termSearch.bind(this);
  };

  termSearch(term) {
    console.log('hi ', term);
  }

  randomSearch() {
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
        we got some poems to make.
        <button onClick={this.props.pingDB}>Ping</button>

        <br/>

        <PoemCreationInput />

        <br />

        <PoemEditing />

        <br />

        <SourcePoems />


      </div>
    );
  }
}

export default CreatePoem;
