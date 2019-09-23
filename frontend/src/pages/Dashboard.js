import React from "react"
import { connect } from "react-redux"
// import { Link } from "react-router-dom"
// import axios from "axios"

import Layout from "../components/Layout"
import SubredditsGrid from "../components/SubredditsGrid"
import SubredditsCards from "../components/SubredditsCards"

import "../styles/Dashboard.css"

function Dashboard(props) {
  return (
    <Layout>
      <h1>Registered Subreddits</h1>
      <div className="dashboard-subreddits">
        <SubredditsCards subreddits={props.subreddits} />
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    subreddits: state.user.subreddits,
  }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard)
