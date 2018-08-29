import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <NavLink to='/' className="navbar-brand">Home</NavLink>
      </nav>
    )
  }
}

export default NavBar