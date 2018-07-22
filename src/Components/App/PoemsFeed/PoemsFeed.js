
import React, { Component } from 'react';
import Poem from './Poem/Poem.js';
import PoemOrigins from './PoemOrigins/PoemOrigins.js';


class PoemsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linesInPoem: []
        }
    }
    likePoem = (poem) => {
        console.log(poem);
    }

    getInfo = (poem) => {
        console.log(poem, this.props.poems);
        let poemOfInterest;
        for (let i=0; i < this.props.poems.length; i++) {
            if (this.props.poems[i].id == poem) {
                poemOfInterest = this.props.poems[i];
                break;
            }
        }
        this.setState({linesInPoem: poemOfInterest.lines});
    }

    render() {
        const poems = this.props.poems.map(poem => <Poem id={poem.id} getInfo={this.getInfo} likePoem={this.likePoem} author={poem.author} title={poem.title} lines={poem.lines} />);

        return (
            <div class="row">
                <div class="col-md-8">
                    <h3>Feed of Poems</h3>
                    <ul>
                        {poems}
                    </ul>
                </div>

                <div class="col-md-4">                    
                    <PoemOrigins info={this.state.linesInPoem}/>
                </div>

            </div>
        );
    }
}

export default PoemsFeed;
