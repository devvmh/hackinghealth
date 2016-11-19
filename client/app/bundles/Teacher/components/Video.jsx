import React from 'react'

class Video extends React.Component {
  render() {
    return <div className="video">
      <a target="_blank" href={this.props.video.file_original_url}>
        <img src={this.props.video.file_thumb_url} />
      </a>
    </div>
  }
}

export default Video
