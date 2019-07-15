import React from "react"

import styled from "styled-components"

import NavBar from "./NavBar"
import Footer from "./Footer"

function Layout(props) {
  return (
    <Container>
      <NavBar />
      <ContentContainer>{props.children}</ContentContainer>
      <Footer />
    </Container>
  )
}

export default Layout

////////////////////// Styled Components ///////////////

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 50px;
`
