import React, { PropTypes } from 'react';
import Video from '../components/Video'

class ArchiveView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: []
    }
  }

  fetchVideosTimeoutId = null
  fetchVideos = () => {
    fetch('/videos.json', {
      credentials: 'include'
    }).then(response => {
      if (!response.ok) throw response
      return response.json()
    }).then(payload => {
      this.setState({ videos: payload })
      this.fetchVideosTimeoutId = window.setTimeout(() => this.fetchVideos(), 60 * 1000) // 1 minute
    }).catch(error => {
      console.error(error)
      this.fetchVideosTimeoutId = window.setTimeout(() => this.fetchVideos(), 5 * 1000) // 5 seconds
    })
  }

  componentDidMount = () => {
    this.fetchVideos()
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.fetchVideosTimeoutId)
  }

  render() {
    const { name, visible } = this.props;

    return (
      <div className="container" style={{ display: visible ? 'block' : 'none' }}>
        <h3>
          {name}'s videos
        </h3>
        <hr />
        {this.state.videos.map((video, index) => {
          return <Video key={index} video={video} />
        })}
      </div>
    );
  }
}

ArchiveView.propTypes = {
  name: PropTypes.string.isRequired
};

export default ArchiveView
