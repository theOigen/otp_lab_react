import React, { Component } from 'react'
import './Login.css'

export class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <div className="login-wrapper">
                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="login" className="form-label">Login</label>
                                <input type="text" className="form-control" id="login" placeholder="Login" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="check" />
                                <label className="form-check-label" htmlFor="check">Remember me</label>
                            </div>
                            <div className="btn-wrapper">
                                <button className="btn btn-outline-dark">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
