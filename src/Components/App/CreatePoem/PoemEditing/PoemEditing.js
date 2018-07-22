
import React, { Component } from 'react';

class PoemEditing extends Component {
  render() {
    console.log(this.props.poemEditing);
    // Hideous:
    const poemLines = this.props.poemEditing.lines.map(line => <li key={line._id}> {line.line} <button onClick={ () => this.props.moveLine(line, "up") }>Move up</button> <button onClick={ () => this.props.moveLine(line, "down") }>Move down</button> <button onClick={ () => this.props.removeLine(line) }>Remove</button> </li>);

    return (
      <div>
       Poem in Progress:
        <ul>
            { poemLines }
        </ul>
      </div>
    );
  }
}

export default PoemEditing;
