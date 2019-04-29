import React from "react"
import { withRouter } from "react-router-dom"
import Cookies from "universal-cookie"
import axios from "axios"
import styled from "styled-components"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { setLoading } from "../reducers/app"
import { logout } from "../reducers/user"
import ColorLine from "./ColorLine"

function NavBar(props) {
  const cookies = new Cookies()

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
    const { sessionId } = cookies.get("session")
    cookies.remove("session")
    await axios.post(props.backendUrl + "/logout", { sessionId })
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
          onClick={redirect("/dashboard/" + props.user.email)}
        >
          Dashboard
        </Item>
        <Item onClick={logout}>Log out</Item>
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

  function renderNavBar() {
    if (props.loading) {
      return <Placeholder>Placeholder</Placeholder>
    }

    if (props.user.loggedIn) {
      return loggedInNavBar()
    } else {
      return loggedOutNavBar()
    }
  }

  return (
    <NavBarContainer>
      <ItemContainer>
        <SiteName onClick={redirect("/")}>
          {/* <span>Logo</span> */}
          <span>Reddalert</span>
        </SiteName>
        {renderNavBar()}
      </ItemContainer>
      <ColorLine />
    </NavBarContainer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
  height: 40px;
`

const Placeholder = styled.div`
  color: #2b2d42;
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
