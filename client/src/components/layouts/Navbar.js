import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/upload" className="nav-link">
                                Upload
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/gallery" className="nav-link">
                                Gallery
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
        )
    }
}


export default Navbar;