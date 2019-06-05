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

export function fetchLogin(credentials) {
    return (dispatch) => {
        dispatch(requestLogin(credentials))
        try {
            setTimeout(() => {
                dispatch(receiveLogin({
                    login: credentials.login
                }))
                cookie.save('login', credentials.login, { path: '/' })
            }, 2000)
        } catch (error) {
            dispatch(receiveLogin(null, error))
        }
    }
}

export function fetchRefreshLogin() {
    return (dispatch) => {
        dispatch(requestRefreshLogin())
        try {
            setTimeout(() => {
                const login = cookie.load('login')
                dispatch(receiveRefreshLogin(login ? { login } : null))
            }, 2000)
        } catch (error) {
            dispatch(receiveRefreshLogin(null, error))
        }
    }
}
