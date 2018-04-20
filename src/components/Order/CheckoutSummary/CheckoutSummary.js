import React from 'react';

import Film from '../../Film/Film';
import styled from 'styled-components';
import {
  Button
} from 'antd';

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
      <h1>Thank you for the order</h1>
        <Film films={props.films}/>
      <ButtonContainer>
        <Button type="primary"
                onClick={props.checkoutContinued}>CONTINUE</Button>
        <Button type="danger"
                onClick={props.checkoutCancelled}>CANCEL</Button>
      </ButtonContainer>
    </Container>
  );
}

export default checkoutSummary;
