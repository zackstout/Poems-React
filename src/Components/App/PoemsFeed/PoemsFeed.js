
import React, { Component } from 'react';
import Poem from './Poem/Poem.js';

class PoemsFeed extends Component {

    likePoem = (poem) => {
        console.log(poem);
    }

  render() {
    const poems = this.props.poems.map(poem => <Poem id={poem.id} likePoem={this.likePoem} author={poem.author} title={poem.title} lines={poem.lines}/>);

    return (
      <div>
       <h3>Feed of Poems</h3>
        <ul>
            { poems } 
        </ul>
      </div>
    );
  }
}

export default PoemsFeed;
