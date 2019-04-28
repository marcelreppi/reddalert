import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default () => (
  <Footer>
    <Link to="/contact">Contact</Link>
    <Link to="/privacy">Privacy Policy</Link>
    <div>
      Got any question? Send an email to{" "}
      <a href="mailto:support@reddalert.me">support@reddalert.me</a>
    </div>
  </Footer>
)

const Footer = styled.div`
  flex-shrink: 0;
  padding: 20px 500px;
  background-color: #f4f5f7;
  display: flex;
  justify-content: space-evenly;
`
