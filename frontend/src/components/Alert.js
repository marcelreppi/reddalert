import React from "react"
import styled, { css } from "styled-components"

import "../styles/Alert.css"

const showStyle = css`
  max-height: 500px;
  transition: max-height 3s;
`

const noShowStyle = css`
  max-height: 0;
  transition: max-height 1s;
`

const AlertContainer = styled.div`
  overflow: hidden;
  ${props => (props.showCondition ? showStyle : noShowStyle)}
`

const Alert = styled.div`
  margin: 20px auto 0px auto;
  padding: 10px;
  background-color: #2b2d42;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: 3px #df0336 solid;
  width: 70%;
`

export default props => {
  return (
    <AlertContainer {...props}>
      <Alert>{props.children}</Alert>
    </AlertContainer>
  )
}
