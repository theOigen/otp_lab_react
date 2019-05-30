import axios from 'axios'

export const REQUEST_WEATHER = 'REQUEST_WEATHER'

export function requestWeather() {
    return {
        type: REQUEST_WEATHER,
        error: null
    }
}

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'

export function receiveWeather(weatherData, err) {
    return {
        type: RECEIVE_WEATHER,
        weatherData: weatherData,
        error: err
    }
}


export function fetchWeather() {
    const reqOptions = {
        mode: "cors"
    }
    return async dispatch => {
        dispatch(requestWeather())
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/924938/`)
            return dispatch(receiveWeather(response.data))
        } catch (err) {
            return dispatch(receiveWeather(null, err))
        }
    }
}
