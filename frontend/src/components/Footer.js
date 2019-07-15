import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default () => (
  <Footer>
    <FooterItem>
      <Link to="/contact">Contact</Link>
    </FooterItem>
    <FooterItem>
      <Link to="/privacy">Privacy Policy</Link>
    </FooterItem>

    <FooterItem>
      Got any question? Send an email to{" "}
      <a href="mailto:support@reddalert.me">support@reddalert.me</a>
    </FooterItem>
  </Footer>
)

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f4f5f7;
`

const FooterItem = styled.span`
  margin: 20px;
`
