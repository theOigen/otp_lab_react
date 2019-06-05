import { REQUEST_WEATHER, RECEIVE_WEATHER } from '../actions/types'

const initialState = {
    forecasts: null,
    isFetching: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_WEATHER:
            return {
                ...state,
                error: null,
                isFetching: true
            }
        case RECEIVE_WEATHER:
            return {
                ...state,
                forecasts: action.payload,
                error: action.error,
                isFetching: false
            }
        default:
            return state
    }
}