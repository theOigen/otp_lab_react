import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { fetchLogin } from '../../actions/authActions'
import { connect } from 'react-redux'
import './Login.css'
import Spinner from '../Spinner'

const Status = Object.freeze({
    VALID: 'valid',
    INVALID: 'invalid',
    NONE: ''
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            login: '',
            password: '',
            loginClass: 'form-control',
            passwordClass: 'form-control',
            isFieldsValid: false,
            fieldsStatus: { loginStatus: Status.NONE, passwordStatus: Status.NONE },
            isLoading: false
        }
        this.performLogin = props.performLogin
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    static getDerivedStateFromProps(newProps, prevState) {
        const compare = (firstUser, secondUser) => {
            if (!firstUser || !secondUser) return firstUser === secondUser
            return firstUser.login === secondUser.login
        }
        if (newProps.user && !compare(newProps.user, prevState.user)) {
            return {
                user: newProps.user,
                isLoading: newProps.isLoading
            }
        }
        if (newProps.isLoading !== prevState.isLoading) {
            return { isLoading: newProps.isLoading }
        }
        return null
    }

    onSubmit(e) {
        e.preventDefault()
        const credentials = {
            login: this.state.login,
            password: this.state.password
        }
        this.performLogin(credentials)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        }, this.validateInput(e.target.name, e.target.value.trim()))
    }

    validateInput(field, value) {
        const fieldsStatus = this.state.fieldsStatus

        if (field === 'login') {
            const isCorrect = /^[a-zA-Z0-9_]+$/.test(value) && value.length >= 5 && value.length <= 16
            fieldsStatus.loginStatus = isCorrect ? Status.VALID : Status.INVALID
        } else if (field === 'password') {
            const isCorrect = /^\S+$/.test(value) && value.length >= 6
            fieldsStatus.passwordStatus = isCorrect ? Status.VALID : Status.INVALID
        }
        this.setState({ fieldsStatus }, this.validateForm)
    }

    validateForm() {
        const { loginStatus, passwordStatus } = this.state.fieldsStatus

        const loginClass = `form-control ${loginStatus}`
        const passwordClass = `form-control ${passwordStatus}`

        const isFieldsValid = loginStatus === Status.VALID && passwordStatus === Status.VALID
        this.setState({ isFieldsValid, loginClass, passwordClass })
    }

    render() {
        if (this.state.user) {
            return <Redirect to="/dashboard" />
        } else if (this.state.isLoading) {
            return <Spinner />
        } else {
            return (
                <div className="login-page">
                    <div className="container">
                        <div className="login-wrapper">
                            <form className="login-form" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="login" className="form-label">Login</label>
                                    <input
                                        name="login"
                                        type="text"
                                        className={this.state.loginClass}
                                        id="login"
                                        placeholder="Login"
                                        value={this.state.login}
                                        onChange={this.onChange}
                                        title="Only english letters, numbers and underscore, from 5 to 16 chars length"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className={this.state.passwordClass}
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        title="From 6 chars length"
                                    />
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="check" />
                                    <label className="form-check-label" htmlFor="check">Remember me</label>
                                </div>
                                <div className="btn-wrapper">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-dark"
                                        disabled={this.state.isFieldsValid ? "" : "disabled"}
                                    >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoadingLogin || state.auth.isLoadingRefreshLogin,
        user: state.auth.loggedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        performLogin(credentials) {
            dispatch(fetchLogin(credentials))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
