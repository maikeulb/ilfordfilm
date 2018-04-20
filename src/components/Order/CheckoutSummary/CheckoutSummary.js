import React from 'react';

import Film from '../../Film/Film';
import styled from 'styled-components';
import {
  Button
} from 'antd';

const Container = styled.div `
    text-align: center;
    width: 80%;
    margin: auto;
`;

const checkoutSummary = (props) => {
  return (
    <Container>
        <h1>Thank you for the order</h1>
        <div style={{width: '100%', margin: 'auto'}}>
           <Film films={props.films}/>
        </div>
        <Button type="primary">CANCEL</Button>
        <Button type="primary">CONTINUE</Button>
      </Container>
  );
}

export default checkoutSummary;
