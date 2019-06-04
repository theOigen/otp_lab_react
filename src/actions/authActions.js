import cookie from 'react-cookies'
import {
    REQUEST_LOGIN,
    REQUEST_REFRESH_LOGIN,
    RECEIVE_LOGIN,
    RECEIVE_REFRESH_LOGIN,
    LOGOUT
} from "./types"

export function requestLogin(credentials) {
    return {
        type: REQUEST_LOGIN,
        credentials: credentials,
        error: null
    }
}

export function receiveLogin(user, err) {
    return {
        type: RECEIVE_LOGIN,
        loggedUser: user,
        error: err
    }
}

export function requestRefreshLogin() {
    return {
        type: REQUEST_REFRESH_LOGIN,
        error: null
    }
}

export function receiveRefreshLogin(user, err) {
    return {
        type: RECEIVE_REFRESH_LOGIN,
        loggedUser: user,
        error: err
    }
}

export function logout() {
    cookie.remove('login', { path: '/' })
    return {
        type: LOGOUT
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function fetchLogin(credentials) {
    return async (dispatch) => {
        dispatch(requestLogin(credentials))
        try {
            await timeout(2000)
            dispatch(receiveLogin({
                login: credentials.login
            }))
            cookie.save('login', credentials.login, { path: '/' })
        } catch (error) {
            dispatch(receiveLogin(null, error))
        }
    }
}

export function fetchRefreshLogin() {
    return async (dispatch) => {
        dispatch(requestRefreshLogin())
        try {
            await timeout(2000)
            const login = cookie.load('login')
            dispatch(receiveRefreshLogin(login ? { login } : null))
        } catch (error) {
            dispatch(receiveRefreshLogin(null, error))
        }
    }
}
