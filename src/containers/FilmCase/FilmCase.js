import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Film from '../../components/Film/Film';

class FilmCase extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        films: {
            salad: 2,
            bacon: 2,
            cheese: 3,
            meat: 2
        }
    }

    render () {
        return (
            <Aux>
                <Film films ={this.state.films} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default FilmCase;
