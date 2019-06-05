import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <div className="error-message">
                    <h1>Error 404</h1>
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFound
