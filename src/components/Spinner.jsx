import React from 'react'
import './Spinner.css'

export default function Spinner() {
    return (
        <div className="spinner-page">
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
}