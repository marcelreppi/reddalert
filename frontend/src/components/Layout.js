import React, { Component } from "react"

import NavBar from "./NavBar"

import "../styles/Layout.css"

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="main-content-container">{this.props.children}</div>
      </div>
    )
  }
}

export default Layout
