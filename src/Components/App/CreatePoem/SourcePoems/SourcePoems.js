
import React, { Component } from 'react';

class SourcePoems extends Component {
    
   
    render() {
    const sourceLines = this.props.sourceLines.map(line => <li key={line._id}> {line.line} <button onClick={ () => this.props.addLine(line) }>Add Line</button> </li>);
    
    return (
      <div>
       <p>Source poems:</p>
        <ul>
            { sourceLines } 
        </ul>
      </div>
    );
  }
}

export default SourcePoems;
