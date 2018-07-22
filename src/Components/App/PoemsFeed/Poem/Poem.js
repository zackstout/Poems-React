
import React, { Component } from 'react';

class Poem extends Component {

    handleLike = (ev) => {
        ev.preventDefault();
        this.props.likePoem(ev.target.id);
    }

    render() {
        const lines = this.props.lines.map(line => <p> {line} </p>);

        return (
            <div>
                <p> Title: {this.props.title} </p>
                <p> Author: {this.props.author} </p>

                <div>
                    {lines}
                </div>

                <button id={this.props.id} onClick={this.handleLike}>Like</button>
                <br />
            </div>
        );
    }
}

export default Poem;
