import React from 'react';
import styled from 'styled-components';

import Aux from '../../../hoc/Aux';

const Li = styled.li `
  list-style-type: 'none';
`;

const Span = styled.span `
  text-transform: 'capitalize';
`;

const Ul = styled.ul `
  padding: '0';
  margin: '0';
`;

const P = styled.p `
  padding-top: '10px';
`;

const orderSummary = (props) => {

  const filmSummary = Object.keys( props.films )
    .map( filmKey => {
      return (
        <Li key={ filmKey }>
          <Span>{ filmKey }</Span>: { props.films[filmKey] }
        </Li> );
      } );

  return (
    <Aux>
      <Ul>
        { filmSummary }
      </Ul>
      <P> <strong>Total Price: { props.price.toFixed( 2 ) }</strong></P>
    </Aux>
  );
}

export default orderSummary;
