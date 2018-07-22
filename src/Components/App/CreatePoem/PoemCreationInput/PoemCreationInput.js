
import React, { Component } from 'react';

class TermSearch {
    constructor(term = '') {
        this.term = term;
    }
};

class PoemCreationInput extends Component {

    constructor() {
        super();

        this.state = new TermSearch();
    }

    // Called when the input field changes
    handleTermChange = (event) => this.setState(new TermSearch(event.target.value));

    // Called when the submit button is pressed
    handleTermSubmit = (event) => {
        event.preventDefault();
        this.props.termSearch(this.state.term);
        this.clearSearchFields();
    }

    handleRandomSubmit = (event) => {
        event.preventDefault();
        this.props.randomSearch();
        this.clearSearchFields();
    }

    // Clear fields of the form by reseting the user
    clearSearchFields = () =>this.setState(new TermSearch());

    render() {
        return (
            <div>
                <form onSubmit={this.handleTermSubmit}>
                    <input onChange={this.handleTermChange} placeholder="Search for ..." value={this.state.term} name="term" />
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.handleRandomSubmit}>Random</button>
            </div>
        );
    }
}

export default PoemCreationInput;
