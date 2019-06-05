import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Forecast from './Forecast'
import { fetchWeather } from '../../actions/weatherActions'
import { logout } from '../../actions/authActions'
import { withStyles } from '@material-ui/core/styles'
import cardStyles from './cardStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forecasts: props.forecasts,
            user: props.user,
            error: props.error,
            isLoading: props.isLoading
        }
        this.fetchForecasts = props.fetchForecasts
        this.onLogout = this.onLogout.bind(this)
        this.performLogout = props.performLogout
    }

    static getDerivedStateFromProps(newProps, prevState) {
        if (newProps.user !== prevState.user) {
            return {
                user: newProps.user
            }
        } else if (newProps.forecasts && newProps.forecasts !== prevState.forecasts) {
            return {
                forecasts: newProps.forecasts,
                user: newProps.user ? newProps.user : prevState.user,
                isLoading: newProps.isLoading
            }
        } else if (newProps.isLoading !== prevState.isLoading) {
            return {
                isLoading: newProps.isLoading,
                error: newProps.error
            }
        }
        return null
    }

    onLogout() {
        this.performLogout()
    }

    componentDidMount() {
        if (this.state.user && this.fetchForecasts)
            this.fetchForecasts()
    }

    render() {
        if (!this.state.user) {
            return <Redirect to="/login" />
        } else if (this.state.isLoading || !this.state.forecasts) {
            return (
                <div className="home-page">
                    <div className="container">
                        <div className="spinner-wrapper">
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            const forecastsArray = this.state.forecasts.consolidated_weather
            const classes = this.props.classes;
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <button className="btn btn-outline-dark ml-auto my-2 my-sm-0" onClick={this.onLogout}>Logout</button>
                        </div>
                    </nav>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {forecastsArray.map(forecast => (
                                <Forecast forecast={forecast} classes={classes} />
                            ))}
                        </Grid>
                    </Container>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchForecasts() {
        dispatch(fetchWeather())
    },
    performLogout() {
        dispatch(logout())
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.loggedUser,
    forecasts: state.weather.forecasts,
    isLoading: state.weather.isFetching,
    error: state.weather.error
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(cardStyles)(Home))
