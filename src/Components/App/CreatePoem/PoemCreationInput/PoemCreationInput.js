
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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandomSubmit = this.handleRandomSubmit.bind(this);
        this.clearSearchFields = this.clearSearchFields.bind(this);
    }

    // Called when the input field changes
    handleChange(event) {
        this.setState(new TermSearch(event.target.value));
    }

    // Called when the submit button is pressed
    handleSubmit(event) {
        event.preventDefault();
        this.props.getLinesWithTerm(this.state);
        console.log(this.state);
        this.clearSearchFields();
    }

    handleRandomSubmit(event) {
        event.preventDefault();
        this.props.getRandomLines();
        this.clearSearchFields();
    }

    // Clear fields of the form by reseting the user
    clearSearchFields() {
        this.setState(new TermSearch());
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} placeholder="Search for ..." value={this.state.term} name="term" />
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.handleRandomSubmit}>Random</button>
            </div>
        );
    }
}

export default PoemCreationInput;
