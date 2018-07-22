
import React, { Component } from 'react';

class PoemsFeed extends Component {
  render() {
    const lines = this.props.poems.map(line => <li key={line._id}> {line.line}, {line.author}, {line.title} </li>);

    return (
      <div>
       <h3>Feed of Poems</h3>
        <ul>
            { lines } 
        </ul>
      </div>
    );
  }
}

export default PoemsFeed;
