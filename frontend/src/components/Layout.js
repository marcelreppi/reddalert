import React, { Component } from "react"

import "../styles/Layout.css"

class Layout extends Component {
  render() {
    return <div className="main-content-container">{this.props.children}</div>
  }
}

export default Layout
