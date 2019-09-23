import React from "react"

import ColorLine from "./ColorLine"

import "../styles/SubredditCards.css"

class SubredditsCards extends React.Component {
  renderSubredditCard(data) {
    return (
      <div key={data.name} className="subreddit-card">
        <div className="subreddit-name">/r/{data.name}</div>

        <div className="subreddit-keyword-container">
          {data.keywords.map(k => {
            return (
              <span key={k} className="subreddit-keyword">
                {k}
              </span>
            )
          })}
          <span className="subreddit-keyword add-keyword-card">+</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="subreddits-cards-container">
        {this.props.subreddits.map(this.renderSubredditCard)}
        <div className="subreddit-card add-subreddit-card">
          <div className="subreddit-name">Add Subreddit</div>
          <div>+</div>
        </div>
      </div>
    )
  }
}

export default SubredditsCards
