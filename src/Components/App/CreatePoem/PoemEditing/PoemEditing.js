
import React, { Component } from 'react';
import SubmitPoem from './SubmitPoem/SubmitPoem.js';

class PoemEditing extends Component {
  render() {
    // Hideous:
    const poemLines = this.props.poemEditing.lines.map(line => <li key={line._id}> {line.line} <button onClick={ () => this.props.moveLine(line, "up") }>Move up</button> <button onClick={ () => this.props.moveLine(line, "down") }>Move down</button> <button onClick={ () => this.props.removeLine(line) }>Remove</button> </li>);

    return (
      <div>
       <h3>Poem in Progress:</h3>
        <ul>
            { poemLines }
        </ul>
        <SubmitPoem submitPoem={this.props.submitPoem} />
      </div>
    );
  }
}

export default PoemEditing;
