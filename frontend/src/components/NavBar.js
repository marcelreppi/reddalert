import React, { Component } from "react"
import { withRouter } from "react-router-dom"

import "../styles/NavBar.css"

class NavBar extends Component {
  redirect(target) {
    return () => this.props.history.push(target)
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar-item-container">
          <div className="name" onClick={this.redirect("/")}>
            {/* <span>Logo</span> */}
            <span>Reddalert</span>
          </div>
          <div className="navbar-item" onClick={this.redirect("/")}>
            Home
          </div>
          <div className="navbar-item" onClick={this.redirect("/login")}>
            Login
          </div>
          <div className="navbar-item" onClick={this.redirect("/register")}>
            Register
          </div>
        </div>
        <div className="color-line" />
      </div>
    )
  }
}

export default withRouter(NavBar)
