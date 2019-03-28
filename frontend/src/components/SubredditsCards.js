import React from "react"

import "../styles/SubredditCards.css"

class SubredditsCards extends React.Component {
  renderSubredditCard(data) {
    return (
      <div key={data.subreddit} className="subreddit-card">
        <div>/r/{data.subreddit}</div>
        <hr />
        <div className="subreddit-keyword-container">
          {data.keywords.map(k => {
            return (
              <span key={k} className="subreddit-keyword">
                {k}
              </span>
            )
          })}
        </div>
        <hr />
        <button>Add keyword</button>
      </div>
    )
  }

  render() {
    return (
      <div className="subreddits-cards-container">
        {this.props.subreddits.map(this.renderSubredditCard)}
      </div>
    )
  }
}

export default SubredditsCards
