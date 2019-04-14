import React, { useContext } from "react"
import { withRouter } from "react-router-dom"

import { AuthUserContext } from "../Store"

import "../styles/NavBar.css"

function NavBar(props) {
  const { authUser, setAuthUser } = useContext(AuthUserContext)

  function redirect(path) {
    return () => {
      props.history.push(path)
    }
  }

  function isActive(page) {
    const path = props.location.pathname
    if (path === "/") return page === "home"
    else if (path === "/login") return page === "login"
    else if (path === "/register") return page === "register"
    else if (path.startsWith("/dashboard")) return page === "dashboard"
  }

  function logout() {
    setAuthUser(null)
    props.history.push("/")
  }

  function loggedInNavBar() {
    return (
      <React.Fragment>
        <div
          className={`navbar-item ${isActive("dashboard") ? "active" : ""}`}
          onClick={redirect("/dashboard/" + authUser)}
        >
          Dashboard
        </div>
        <div className={`navbar-item`} onClick={logout}>
          Log out
        </div>
        {/* <div>Logged in as {authUser}</div> */}
      </React.Fragment>
    )
  }

  function loggedOutNavBar() {
    return (
      <React.Fragment>
        <div
          className={`navbar-item ${isActive("login") ? "active" : ""}`}
          onClick={redirect("/login")}
        >
          Log in
        </div>
        <div
          className={`navbar-item ${isActive("register") ? "active" : ""}`}
          onClick={redirect("/register")}
        >
          Register
        </div>
      </React.Fragment>
    )
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
        {authUser !== null ? loggedInNavBar() : loggedOutNavBar()}
      </div>
      <div className="color-line" />
    </div>
  )
}

export default withRouter(NavBar)
