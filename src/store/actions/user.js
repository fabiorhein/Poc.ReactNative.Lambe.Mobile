import axios from 'axios';
import {
    LOADING_USER,
    USER_LOADED,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
} from './actionTypes';

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyDuvukodQd4qd6Cv9yzpi9hVe7VjAngpdo'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = user => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => console.log(err))
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => console.log(err))
                        .then(() => {
                            dispatch(login(user))
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser());
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => console.log(err))
            .then(resp => {
                if (resp.data.localId) {
                    user.token = resp.data.idToken;
                    axios.get(`/users/${resp.data.localId}.json`)
                        .catch(err => console.log(err))
                        .then(res => {
                            delete user.password;
                            user.name = res.data.name;
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}