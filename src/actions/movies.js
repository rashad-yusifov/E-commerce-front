import axios from 'axios';
import {BASE_URL} from '../config/env';


export const FETCH_MOVIES_FULFILLED = "FETCH_MOVIES_FULFILLED";
export const FETCH_MOVIES_REJECTED = "FETCH_MOVIES_REJECTED";
export const FETCH_MOVIES_PENDING = "FETCH_MOVIES_PENDING";


export const ADD_MOVIE_FULFILLED = "ADD_MOVIE_FULFILLED";
export const ADD_MOVIE_REJECTED = "ADD_MOVIE_REJECTED";
export const ADD_MOVIE_PENDING = "ADD_MOVIE_PENDING";


export const FETCH_MOVIE_FULFILLED = "FETCH_MOVIE_FULFILLED";
export const FETCH_MOVIE_REJECTED = "FETCH_MOVIE_REJECTED";
export const FETCH_MOVIE_PENDING = "FETCH_MOVIE_PENDING";


export const EDIT_MOVIE_FULFILLED = "EDIT_MOVIE_FULFILLED";
export const EDIT_MOVIE_REJECTED = "EDIT_MOVIE_REJECTED";
export const EDIT_MOVIE_PENDING = "EDIT_MOVIE_PENDING";


export const TRASH_MOVIE_FULFILLED = "TRASH_MOVIE_FULFILLED";
export const TRASH_MOVIE_REJECTED = "TRASH_MOVIE_REJECTED";
export const TRASH_MOVIE_PENDING = "TRASH_MOVIE_PENDING";




export const fetchMovies = () => {
    return dispatch => {
        dispatch({
            type: 'FETCH_MOVIES',
            payload: axios.get(`${BASE_URL}/get-movies`).then(res => res.data)
        });
    }
}


export const addMovie = (payload) => {
    return dispatch => {
        return dispatch({
            type: "ADD_MOVIE",
            payload: axios.post(`${BASE_URL}/create-movie`, payload).then(res => res.data)
        });
    }
}


export const editMovie = (payload) => {
    return dispatch => {
        return dispatch({
            type: "EDIT_MOVIE",
            payload: axios.put(`${BASE_URL}/update-movie/${payload.id}`, {
                ...payload.movie
            }).then(res => res.data)
        });
    }
}



export const trashMovie = (id) => {
    return dispatch => {
        return dispatch({
            type: "TRASH_MOVIE",
            payload: axios.delete(`${BASE_URL}/delete-movie/${id}`, {}).then(res => id)
        });
    }
}


export const getMovieById = (payload) => {
    return dispatch => {
        return dispatch({
            type: "FETCH_MOVIE",
            payload: axios.get(`${BASE_URL}/get-movie/${payload}`).then(res => res.data)
        });
    }
}   