import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchWeather } from '../actions/weatherActions'

class Home extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         isFetching: true,
    //         weatherData: []
    //     }
    // }

    componentWillMount() {
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
                    {this.props.forecasts.map(weather =>
                        <div key={weather.id}>
                            {weather.weather_state_name}
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
