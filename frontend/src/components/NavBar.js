import React, { useContext } from "react"
import { withRouter } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import styled from "styled-components"

import { AppContext } from "../contexts/AppProvider"
import { AuthUserContext } from "../contexts/AuthUserProvider"
import ColorLine from "./ColorLine"

function NavBar(props) {
  const { authUser, setAuthUser, isUserAuthenticated } = useContext(
    AuthUserContext
  )
  const { backendURL, loading } = useContext(AppContext)
  const [cookies, setCookie, removeCookie] = useCookies()

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
    await axios.post(backendURL + "/logout", { sessionId })
    removeCookie("session")
    setAuthUser(null)
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
          onClick={redirect("/dashboard/" + authUser)}
        >
          Dashboard
        </Item>
        <Item onClick={logout}>Log out</Item>
        {/* <div>Logged in as {authUser}</div> */}
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
        {isUserAuthenticated() ? loggedInNavBar() : loggedOutNavBar()}
      </ItemContainer>
      <ColorLine />
    </NavBarContainer>
  )
}

export default withRouter(NavBar)

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
