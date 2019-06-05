import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchWeather } from '../actions/weatherActions'

/**
 * @TODO
 * import { Link } from 'react-router-dom'
 * <Link to="/{path}"
 *  <li>blah-blah</li>
 * </Link>
 */

class Home extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     isFetching: true,
        //     weatherData: []
        // }
        this.props.fetchWeather()
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div>
                    {this.props.forecasts.map(forecast =>
                        <div key={forecast.id}>
                            {forecast.weather_state_name}
                        </div>
                    )}
                    <h1>Home page</h1>
                </div>
            )
        }
    }
}

Home.propTypes = {
    fetchWeather: PropTypes.func.isRequired,
    forecasts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    forecasts: state.weather.forecasts,
    isFetching: state.weather.isFetching,
    error: state.weather.error
})

export default connect(mapStateToProps, { fetchWeather })(Home)
