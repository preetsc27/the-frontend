import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class StudentNavbar extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <Link className="navbar-brand" to="/student-home">Kraftshala</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/student-booking">My Bookings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>  
                </nav>
                <br/>
            </React.Fragment>
        )
    }
}
