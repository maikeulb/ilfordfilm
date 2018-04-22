import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addFilm = ( name ) => {
  return {
    type: actionTypes.ADD_FILM,
    filmName: name
  };
};

export const removeFilm = ( name ) => {
  return {
    type: actionTypes.REMOVE_FILM,
    filmName: name
  };
};

export const setFilms = ( films ) => {
  return {
    type: actionTypes.SET_FILMS,
    films: films
  };
};

export const fetchFilmsFailed = () => {
  return {
    type: actionTypes.FETCH_FILMS_FAILED
  };
};

export const initFilms = () => {
  return dispatch => {
    axios.get( 'https://ilfordfilms.firebaseio.com/films.json' )
      .then( response => {
         dispatch(setFilms(response.data));
      } )
      .catch( error => {
          dispatch(fetchFilmsFailed());
      } );
  };
};
