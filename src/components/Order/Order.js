import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  width: 80%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const Span = styled.span `
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  border: 1px solid #ccc;
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

  const filmOutput = films.map(ig => {
    return (
      <Span 
        key={ig.name}>{ig.name} ({ig.amount})
      </Span>
    )
  });

  return (
    <Container>
      <p>Films: {filmOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
    </Container>
  );
};

export default order;
