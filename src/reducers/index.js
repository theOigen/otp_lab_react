import weather from './weatherReducer'
import auth from './authReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    weather,
    auth
})
