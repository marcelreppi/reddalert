import React from "react"
import { connect } from "react-redux"
// import { Link } from "react-router-dom"
// import axios from "axios"

import Layout from "../components/Layout"
// import SubredditsGrid from "../components/SubredditsGrid"
// import SubredditsCards from "../components/SubredditsCards"

import "../styles/Dashboard.css"

function Dashboard(props) {
  return (
    <Layout>
      <h1>Dashboard</h1>

      <div className="dashboard-email">
        Notifications for
        <h3>{props.email}</h3>
      </div>
      <div className="dashboard-subreddits">
        {/* <span>Registered subreddits</span> */}
        {/* <SubredditsGrid subreddits={this.state.subreddits} /> */}
        {/* <SubredditsCards subreddits={this.state.subreddits} /> */}
        {/* <button className="subreddit-button">Add subreddit</button> */}
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
  }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard)
