import React from "react"
import styled from "styled-components"

import ColorLine from "../components/ColorLine"

function Form(props) {
  return (
    <FormContainer>
      <StyledForm {...props}>{props.children}</StyledForm>
      <ColorLine />
    </FormContainer>
  )
}

export default Form

const FormContainer = styled.div`
  -webkit-box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  -moz-box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  box-shadow: 0px 0px 17px 1px rgba(214, 214, 214, 1);
  width: 400px;
  margin: 30px auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 30px;
`

///////////////////// Exported Styled Form Elementes ////////////////////////

export const Label = styled.label`
  text-align: left;
  margin-bottom: 5px;
  &:nth-child(n + 2) {
    margin-top: 20px;
  }
`

export const TextInput = styled.input.attrs({
  type: "text",
})`
  height: 40px;
  border: 1px black solid;
  border-radius: 5px;
  padding: 0px 10px;
  font-size: 16px;
`

export const PasswordInput = styled(TextInput).attrs({
  type: "password",
})``

export const CheckboxContainer = styled.div`
  text-align: left;
  margin-bottom: 5px;
  margin-top: 10px;
`

export const CheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  margin-right: 10px;
`

export const CheckboxLabel = styled.label`
  &:hover {
    cursor: pointer;
  }
`

export const SubmitButton = styled.input.attrs({
  type: "submit",
})`
  margin: 30px auto;
  height: 50px;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  background: #df0336;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
`
