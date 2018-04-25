import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';

const Container = styled.div `
  width: 80%;
  border: 2px solid #eee;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const Span = styled.span `
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  padding: 5px;
`;

const order = (props) => {
  const films = [];

  for (let filmName in props.films) {
    films.push({
      name: filmName,
      amount: props.films[filmName]
    });
  }

  const filmOutput = films.map(flm => {
    return (
      <List size="small">
        <Span key={flm.name}>{flm.name} x {flm.amount}</Span>
      </List>
    )
  });

  return (
    <Container>
      <p>{filmOutput}</p>
      <p><b>Price</b>: USD {Number.parseFloat( props.price ).toFixed( 2 )}</p>
    </Container>
  );
};

export default order;
