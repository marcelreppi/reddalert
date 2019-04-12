import React from "react"

import "../styles/Alert.css"

export default props => (
  <div className={`alert-container ${props.showCondition ? "fade-in" : ""}`}>
    <div className={props.styleClass}>{props.alert}</div>
  </div>
)
