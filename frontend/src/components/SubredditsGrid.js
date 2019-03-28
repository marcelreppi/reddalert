import React from "react"

import "../styles/SubredditsGrid.css"

class SubredditsGrid extends React.Component {
  renderSubreddits() {
    const divs = []
    this.props.subreddits.forEach(x => {
      divs.push(<div className="subreddit-name">{x.subreddit}</div>)
      divs.push(
        <div className="subreddit-keyword">{x.keywords.join(", ")}</div>
      )
      divs.push(<button>Plus</button>)
    })
    return divs
  }

  render() {
    return (
      <div className="subreddits-grid">
        <div className="subreddit-name grid-title">Subreddit</div>
        <div className="subreddit-keyword grid-title">Keywords</div>
        <div className="grid-title" />

        {this.renderSubreddits()}
      </div>
    )
  }
}

export default SubredditsGrid
