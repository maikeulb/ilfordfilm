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
          <li style={{listStyleType: 'none'}} key={filmKey}>
            <span style={{ textTransform: 'capitalize' }}>{filmKey}</span>: {this.props.films[filmKey]}
          </li> );
        } );

    return (
      <Aux>
        <ul style={{padding:'0', margin:'0'}}>
          {filmSummary}
        </ul>
        <p style={{paddingTop:'10px'}}><strong>Total Price: {this.props.price.toFixed( 2 )}</strong></p>
      </Aux>
    );
  }
}

export default OrderSummary;
