
import React, { Component } from 'react';

class PoemOrigins extends Component {
    render() {
        console.log(this.props.info);
        const lines = this.props.info.map(line => <div key={line._id}> 
            <p class="italic">
                { line.line }
            </p>
            <p> 
                -- { line.original_author }, <span class="italic">{ line.original_title }</span>, { line.original_lineno }
            </p>
            <hr />
        </div>);

        return (
            <div class="sticky">
                <h3>Poem Origins:</h3>
                { lines }
            </div>
        );
    }
}

export default PoemOrigins;
