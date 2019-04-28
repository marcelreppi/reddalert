import React from "react"

import styled from "styled-components"

import NavBar from "./NavBar"
import Footer from "./Footer"

function Layout(props) {
  return (
    <LayoutContainer>
      <NavBar />
      <ContentContainer>{props.children}</ContentContainer>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout

////////////////////// Styled Components ///////////////

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ContentContainer = styled.div`
  text-align: center;
  margin: 40px 500px;
  flex: 1 0 auto;
`
