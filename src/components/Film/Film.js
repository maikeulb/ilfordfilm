import React from 'react';
import styled from 'styled-components';

import Films from './Films/Films';

const Container = styled.div`
    width: 100%;
    margin: auto auto;
    height: 250px;
    overflow: scroll;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;

    @media (min-width: 500px) and (min-height: 400px) {
        width: 350px;
        height: 300px;
    }

    @media (min-width: 500px) and (min-height: 401px) {
        width: 450px;
        height: 400px;
    }

    @media (min-width: 1000px) and (min-height: 700px) {
        width: 700px;
        height: 400px;
    }

`;


const film = ( props ) => {
    let transformedFilms= Object.keys( props.films)
        .map( filmKey => {
            return [...Array( props.films[filmKey] )].map( ( _, i ) => {
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
        transformedFilms = <p>Please start adding film!</p>;
    }
    return (
        <Container>
          {transformedFilms }
        </Container>
    );
};

export default film;
