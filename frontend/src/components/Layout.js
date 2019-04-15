import React from "react"
import { Link } from "react-router-dom"

import NavBar from "./NavBar"

import "../styles/Layout.css"

function Layout(props) {
  return (
    <div className="layout">
      <NavBar />
      <div className="content-container">{props.children}</div>
      <div className="footer">
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <div>
          Got any question? Send an email to{" "}
          <a href="mailto:support@reddalert.me">support@reddalert.me</a>
        </div>
      </div>
    </div>
  )
}

export default Layout
