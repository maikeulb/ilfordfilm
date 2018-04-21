import * as actionTypes from './actions';

const initialState = {
    films: {
        panf: 0,
        delta100: 0,
        hp5: 0,
        delta3200: 0
    },
    totalPrice: 4
};

const FILM_PRICES = {
    panf: 4.5,
    delta100: 4.4,
    hp5: 5.5,
    delta3200: 8.0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_FILM:
            return {
                ...state,
                films: {
                    ...state.films,
                    [action.filmName]: state.films[action.filmName] + 1
                },
                totalPrice: state.totalPrice + FILM_PRICES[action.filmName]
            };
        case actionTypes.REMOVE_FILM:
            return {
                ...state,
                films: {
                    ...state.films,
                    [action.filmName]: state.films[action.filmName] - 1
                },
                totalPrice: state.totalPrice - FILM_PRICES[action.filmName]
            };
        default:
            return state;
    }
};

export default reducer;
