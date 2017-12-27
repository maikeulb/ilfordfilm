import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    const filmSummary = Object.keys( this.props.films)
      .map( filmKey => {
        return (
          <li key={filmKey}>
            <span style={{ textTransform: 'capitalize' }}>{filmKey}</span>: {this.props.films[filmKey]}
          </li> );
        } );

    return (
      <Aux>
        <ul>
          {filmSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed( 2 )}</strong></p>
        <p>Continue to Checkout?</p>
      </Aux>
    );
  }
}

export default OrderSummary;
