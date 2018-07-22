
import React, { Component } from 'react';

class Poem extends Component {

    handleLike = (ev) => {
        ev.preventDefault();
        this.props.likePoem(ev.target.name);
    }

    handleInfo = (ev) => {
        ev.preventDefault();
        this.props.getInfo(ev.target.name);
    }

    render() {
        const lines = this.props.lines.map(line => <p> { line.line } </p>);

        return (
            <div class="poem">
                <p> Title: {this.props.title} </p>
                <p> Author: {this.props.author} </p>

                <div>
                    {lines}
                </div>

                <button name={this.props.id} onClick={this.handleLike}>Like</button>
                &emsp; &emsp;
                <button name={this.props.id} onClick={this.handleInfo}>See Info</button>

            </div>
        );
    }
}

export default Poem;
