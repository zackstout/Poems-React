
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
        const lines = this.props.lines.map(line => <p> {line.line} </p>);

        return (
            <div class="poem row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8">
                    <div class="poemContainer">
                        <div class="italic">
                            {lines}
                        </div>

                        <hr />

                        <div>
                            <b>{this.props.title}</b>, by {this.props.author}
                        </div>
                    </div>

                    <button name={this.props.id} onClick={this.handleLike}>Like</button>
                    <button name={this.props.id} onClick={this.handleInfo}>See Info</button>
                </div>
                <div class="col-md-2">
                </div>

                <hr />
            </div>
        );
    }
}

export default Poem;
