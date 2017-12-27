import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Film from '../../components/Film/Film';

import styled from 'styled-components';

class FilmCase extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        films: {
            panf: 2,
            delta100: 22,
            hp5: 3,
            delta3200: 2
        }
    }

    render () {
        return (
            <Aux>
                <Film films ={this.state.films} />
                <div>Controls</div>
            </Aux>
        );
    }
}

export default FilmCase;
