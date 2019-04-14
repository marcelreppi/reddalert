import React from "react"
import { withRouter } from "react-router-dom"

import "../styles/NavBar.css"

function NavBar(props) {
  function redirect(path) {
    return () => {
      props.history.push(path)
    }
  }

  function isActive(page) {
    switch (props.location.pathname) {
      case "/":
        return page === "home"
      case "/login":
        return page === "login"
      case "/register":
        return page === "register"
      default:
        break
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-item-container">
        <div className="name" onClick={redirect("/")}>
          {/* <span>Logo</span> */}
          <span>Reddalert</span>
        </div>
        <div
          className={`navbar-item ${isActive("home") ? "active" : ""}`}
          onClick={redirect("/")}
        >
          Home
        </div>
        <div
          className={`navbar-item ${isActive("login") ? "active" : ""}`}
          onClick={redirect("/login")}
        >
          Login
        </div>
        <div
          className={`navbar-item ${isActive("register") ? "active" : ""}`}
          onClick={redirect("/register")}
        >
          Register
        </div>
      </div>
      <div className="color-line" />
    </div>
  )
}

export default withRouter(NavBar)
