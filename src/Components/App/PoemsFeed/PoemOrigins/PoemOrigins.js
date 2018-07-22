
import React, { Component } from 'react';

class PoemOrigins extends Component {
    render() {
        console.log(this.props.info);
        const lines = this.props.info.map(line => <div key={line._id}> 
            { line.line }
            <ul>
                <li>Author: { line.original_author }</li>
                <li>Title: { line.original_title }</li>
                <li>Line No.: { line.original_lineno }</li>
            </ul>
        </div>);

        return (
            <div>
                { lines }
            </div>
        );
    }
}

export default PoemOrigins;
