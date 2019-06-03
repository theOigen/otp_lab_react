import axios from 'axios'
import { REQUEST_WEATHER, RECEIVE_WEATHER } from './types'

export function requestWeather() {
    return {
        type: REQUEST_WEATHER,
        error: null
    }
}

export function receiveWeather(forecasts, err) {
    return {
        type: RECEIVE_WEATHER,
        payload: forecasts,
        error: err
    }
}


export function fetchWeather() {
    return async (dispatch) => {
        dispatch(requestWeather())
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/924938/`)
            return dispatch(receiveWeather(response.data.consolidated_weather, null))
        } catch (err) {
            return dispatch(receiveWeather(null, err))
        }
    }
}
