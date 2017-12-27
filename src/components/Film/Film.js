import React from 'react';

import Films from './Films/Films';
import styled from 'styled-components';

const Container = styled.div`
  width: 80vw;
  margin: auto auto;
  height: 50vh;
  overflow-y: scroll;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;

  @media screen and (max-width: 768px){
    width: 100vw;
  }
`;

const film = ( props ) => {
  let transformedFilms= Object.keys( props.films)
    .map( filmKey => {
      return [...Array( props.films[filmKey] )]
        .map( ( _, i ) => {
          return (
            <div style={{display:'inline-block'}}>
              <Films key={filmKey + i} type={filmKey} />
            </div>);
        } );
      } )
      .reduce((arr, el) => {
        return arr.concat(el)
      }, []);
  if (transformedFilms.length === 0) {
    transformedFilms = <p>Please add film.</p>;
  }
  return (
    <Container>
      {transformedFilms }
    </Container>
  );
};

export default film;
