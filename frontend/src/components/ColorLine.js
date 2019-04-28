import React from "react"
import styled from "styled-components"

const ColorLine = styled.div`
  /* background-color: #ef233c; */
  background: #ef233c; /* Old browsers */
  background: -moz-linear-gradient(
    left,
    #ef233c 0%,
    #d80032 89%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    #ef233c 0%,
    #d80032 89%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    #ef233c 0%,
    #d80032 89%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ef233c', endColorstr='#d80032',GradientType=1 ); /* IE6-9 */
  height: 7px;
  width: 100%;
`

export default () => <ColorLine />
