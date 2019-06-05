import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchRefreshLogin } from '../actions/authActions'
import Login from './Login/Login'
import Home from './Forecasts/Home'
import NotFound from './404/NotFound'

class Main extends Component {
    componentDidMount() {
        this.props.performRefreshLogin()
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/dashboard" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        performRefreshLogin() {
            dispatch(fetchRefreshLogin())
        }
    }
}

export default connect(null, mapDispatchToProps)(Main)
