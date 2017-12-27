import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = ( props ) => {
    const filmSummary = Object.keys( props.films)
        .map( filmKey => {
            return (
                <li key={filmKey}>
                    <span style={{ textTransform: 'capitalize' }}>{filmKey}</span>: {props.films[filmKey]}
                </li> );
        } );

    return (
        <Aux>
            <ul>
                {filmSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;
