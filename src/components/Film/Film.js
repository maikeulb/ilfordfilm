import React from 'react';

import classes from './Film.css';
import Films from './Films/Films';

const film = ( props ) => {
    let transformedFilms= Object.keys( props.films)
        .map( filmKey => {
            return [...Array( props.films[filmKey] )].map( ( _, i ) => {

                return <div style={{display:'inline-block'}}>
                <Films key={filmKey + i} type={filmKey} />
                </div>;
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
            {transformedFilms }
            <Films type="box-bottom" />
        </div>
    );
};

export default film;
