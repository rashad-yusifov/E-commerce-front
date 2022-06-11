import {
    FETCH_MOVIES_FULFILLED,
    FETCH_MOVIES_REJECTED,
    FETCH_MOVIES_PENDING,
    ADD_MOVIE_FULFILLED,
    ADD_MOVIE_REJECTED,
    ADD_MOVIE_PENDING,
    FETCH_MOVIE_FULFILLED,
    FETCH_MOVIE_REJECTED,
    FETCH_MOVIE_PENDING,
    EDIT_MOVIE_FULFILLED,
    EDIT_MOVIE_REJECTED,
    EDIT_MOVIE_PENDING,
    TRASH_MOVIE_FULFILLED,
    TRASH_MOVIE_REJECTED,
    TRASH_MOVIE_PENDING
} from "../actions/movies";


const initalState = {
    movies: [],
    adding: false,
    fetching: false,
}

export default (state = initalState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_FULFILLED:
            return {
                ...state,
                movies: action?.payload?.docs,
                fetching: false
            }
        case FETCH_MOVIES_PENDING:
            return {
                ...state,
                fetching: true
            }
        case FETCH_MOVIES_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            }
        case ADD_MOVIE_FULFILLED:
            return {
                ...state,
                error: action.payload,
                adding: false
            }

        // Add movies
        
        case ADD_MOVIE_PENDING:
            return {
                ...state,
                fetching: true,
                adding: true
            }
        case ADD_MOVIE_REJECTED:
            return {
                ...state,
                error: action.payload,
                adding: false
            }

        // FETCH MOVIE 

        case FETCH_MOVIE_FULFILLED:
            return {
                ...state,
                movie: action.payload['docs'][0],
                error: false,
                fetching: false,
            }
        case FETCH_MOVIE_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false,
            }
        case FETCH_MOVIE_PENDING:
            return {
                ...state,
                error: action.payload,
                fetching: true,
            }

        // edit movie 

        case EDIT_MOVIE_FULFILLED:
            return {
                ...state,
                fetching: false,
            }
        case EDIT_MOVIE_REJECTED:
            return {
                ...state,
                fetching: false,
            }
        case EDIT_MOVIE_PENDING:
            return {
                ...state,
                fetching: true
            }


        // trash movie 

        case TRASH_MOVIE_FULFILLED:
            return {
                ...state,
                movies: state.movies.filter(item => item._id != action.payload),
                fetching: false,
            }
        case TRASH_MOVIE_REJECTED:
            return {
                ...state,
                fetching: false,
            }
        case TRASH_MOVIE_PENDING:
            return {
                ...state,
                fetching: true
            }

        default:
            return state;
    }
}