import React from 'react';

import classes from './Film.css';
import Films from './Films/Films';

const film = ( props ) => {
    let transformedFilms= Object.keys( props.films)
        .map( filmKey => {
            return [...Array( props.films[filmKey] )].map( ( _, i ) => {
                return <Films key={filmKey + i} type={filmKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedFilms.length === 0) {
        transformedFilms = <p>Please start adding film!</p>;
    }
    return (
        <div className={classes.Film}>
            <Films type="bread-top" />
            {transformedFilms }
            <Films type="bread-bottom" />
        </div>
    );
};

export default film;
