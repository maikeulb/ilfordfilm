import React from 'react';

import Film from '../../Film/Film';
import styled from 'styled-components';
import { Button } from 'antd';

const Container = styled.div `
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  overflow: hidden;
`;

const ButtonContainer = styled.div `
  > button {
    margin-right: 5px;
  }
  > button + button {
    margin-left: 5px;
  }
`;

const checkoutSummary = (props) => {
  return (
    <Container>
      <h3>Shopping Cart</h3>
        <Film films={props.films}/>
        <p><strong>Total Price: {props.price.toFixed( 2 )}</strong></p>
      <ButtonContainer>
        <Button type="primary"
                onClick={props.checkoutContinued}>CHECKOUT</Button>
        <Button type="danger"
                onClick={props.checkoutCancelled}>CANCEL</Button>
      </ButtonContainer>
    </Container>
  );
}

export default checkoutSummary;
