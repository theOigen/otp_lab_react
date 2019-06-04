import {
    REQUEST_LOGIN,
    REQUEST_REFRESH_LOGIN,
    RECEIVE_LOGIN,
    RECEIVE_REFRESH_LOGIN,
    LOGOUT
} from "../actions/types"

const initialState = {
    loggedUser: null,
    credentials: null,
    isLoadingLogin: false,
    isLoadingRefreshLogin: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                credentials: action.credentials,
                isLoadingLogin: true
            }
        case RECEIVE_LOGIN:
            return {
                ...state,
                loggedUser: action.loggedUser,
                isLoadingLogin: false
            }
        case REQUEST_REFRESH_LOGIN:
            return {
                ...state,
                isLoadingRefreshLogin: true
            }
        case RECEIVE_REFRESH_LOGIN:
            return {
                ...state,
                loggedUser: action.loggedUser,
                isLoadingRefreshLogin: false
            }
        case LOGOUT:
            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }
}
