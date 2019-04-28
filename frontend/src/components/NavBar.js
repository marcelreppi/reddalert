import React from "react"
import { withRouter } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { setLoading } from "../reducers/app"
import { logout } from "../reducers/user"
import ColorLine from "./ColorLine"

function NavBar(props) {
  const [cookies, , removeCookie] = useCookies()

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

  async function logout() {
    const { sessionId } = cookies.session
    await axios.post(props.backendUrl + "/logout", { sessionId })
    removeCookie("session")
    props.logout()
    props.history.push("/")
  }

  function loggedInNavBar() {
    return (
      <React.Fragment>
        <Item active={isActive("home")} onClick={redirect("/")}>
          Home
        </Item>
        <Item
          active={isActive("dashboard")}
          onClick={redirect("/dashboard/" + props.user)}
        >
          Dashboard
        </Item>
        <Item onClick={logout}>Log out</Item>
        {/* <div>Logged in as {user}</div> */}
      </React.Fragment>
    )
  }

  function loggedOutNavBar() {
    return (
      <React.Fragment>
        <Item active={isActive("home")} onClick={redirect("/")}>
          Home
        </Item>
        <Item active={isActive("login")} onClick={redirect("/login")}>
          Log in
        </Item>
        <Item active={isActive("register")} onClick={redirect("/register")}>
          Register
        </Item>
      </React.Fragment>
    )
  }

  return (
    <NavBarContainer>
      <ItemContainer>
        <SiteName onClick={redirect("/")}>
          {/* <span>Logo</span> */}
          <span>Reddalert</span>
        </SiteName>
        {props.loggedIn === true ? loggedInNavBar() : loggedOutNavBar()}
      </ItemContainer>
      <ColorLine />
    </NavBarContainer>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    backendUrl: state.app.backendUrl,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setLoading,
      logout,
    },
    dispatch
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
)

////////////////////////////// Styled Components /////////////////////////////

const NavBarContainer = styled.div`
  background-color: #2b2d42;
  color: #edf2f4;
  text-align: center;
  font-size: 20px;
`
const ItemContainer = styled.div`
  --padding-top: 25px;
  display: flex;
  justify-content: center;
  padding: var(--padding-top) 0px 15px 0px;
`

const Item = styled.div`
  margin: 0px 80px;
  padding-bottom: 6px;
  border-bottom: ${props =>
    props.active ? "2px white solid" : "2px #2b2d42 solid"};
  &:hover {
    border-bottom: 2px white solid;
    cursor: pointer;
  }
`

const SiteName = styled.div`
  position: absolute;
  top: var(--padding-top);
  left: 300px;
  &:hover {
    cursor: pointer;
  }
`
