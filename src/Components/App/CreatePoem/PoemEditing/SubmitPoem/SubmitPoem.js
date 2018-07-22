
import React, { Component } from 'react';

class AuthorInput {
    constructor(author = '') {
        this.author = author;
    }
};

class TitleInput {
    constructor(title = '') {
        this.title = title;
    }
};

class SubmitPoem extends Component {

    constructor() {
        super();

        this.state =
            {
                author: new AuthorInput(),
                title: new TitleInput()
            }
    }

    // Called when the input field changes
    handleTitleChange = (event) => this.setState(new TitleInput(event.target.value));

    handleAuthorChange = (event) => this.setState(new AuthorInput(event.target.value));

    // Called when the submit button is pressed
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitPoem(this.state.author, this.state.title);
        // this.props.termSearch(this.state.term);
        this.clearInputFields();
    }

    // Clear fields of the form by reseting the user
    clearInputFields = () => {
        this.setState({ author: new AuthorInput() });
        this.setState({ title: new TitleInput() });
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleAuthorChange} placeholder="Authored by ..." value={this.state.author.author} name="author" />
                <input onChange={this.handleTitleChange} placeholder="Titled ..." value={this.state.title.title} name="title" />
                <input type="submit" value="Submit Poem" />
            </form>
        );
    }
}

export default SubmitPoem;
