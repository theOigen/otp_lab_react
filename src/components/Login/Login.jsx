import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { fetchLogin } from '../../actions/authActions'
import { connect } from 'react-redux'
import './Login.css'

const Status = Object.freeze({
    VALID: 'valid',
    INVALID: 'invalid',
    NONE: ''
})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            loginClass: 'form-control',
            passwordClass: 'form-control',
            isFieldsValid: false,
            fieldsStatus: { loginStatus: Status.NONE, passwordStatus: Status.NONE },
            isLoading: false
        }
        this.onChange = this.onChange.bind(this)
        this.validateInput = this.validateInput.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        /**
         * @TODO
         * finish function
         */
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
        return (
            <div className="login-page">
                <div className="container">
                    <div className="login-wrapper">
                        <form className="login-form">
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
                                />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="check" />
                                <label className="form-check-label" htmlFor="check">Remember me</label>
                            </div>
                            <div className="btn-wrapper">
                                <button
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoadingLogin || state.auth.isLoadingRefreshLogin,
        user: state.auth.loggedUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (credentials) => {
            dispatch(fetchLogin(credentials));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
