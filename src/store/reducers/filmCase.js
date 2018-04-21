import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    films: null,
    totalPrice: 0,
    error: false
};

const FILM_PRICES = {
    panf: 4.5,
    delta100: 4.4,
    hp5: 5.5,
    delta3200: 8.0
};

const addFilm = ( state, action ) => {
    const updatedFilm = { [action.filmName]: state.films[action.filmName] + 1 }
    const updatedFilms = updateObject( state.films, updatedFilm );
    const updatedState = {
        films: updatedFilms,
        totalPrice: state.totalPrice + FILM_PRICES[action.filmName]
    }
    return updateObject( state, updatedState );
};

const removeFilm = (state, action) => {
    const updatedIng = { [action.filmName]: state.films[action.filmName] - 1 }
    const updatedIngs = updateObject( state.films, updatedIng );
    const updatedSt = {
        films: updatedIngs,
        totalPrice: state.totalPrice + FILM_PRICES[action.filmName]
    }
    return updateObject( state, updatedSt );
};

const setFilms = (state, action) => {
    return updateObject( state, {
        films: {
            panf: action.films.panf,
            delta100: action.films.delta100,
            hp5: action.films.hp5,
            delta3200: action.films.delta3200
        },
        totalPrice: 0,
        error: false
    } );
};

const fetchFilmsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_FILM: return addFilm( state, action );
        case actionTypes.REMOVE_FILM: return removeFilm(state, action);
        case actionTypes.SET_FILMS: return setFilms(state, action);    
        case actionTypes.FETCH_FILMS_FAILED: return fetchFilmsFailed(state, action);
        default: return state;
    }
};

export default reducer;
