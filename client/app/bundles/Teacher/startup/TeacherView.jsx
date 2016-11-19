import React, { Component } from 'react';
import ReactOnRails from 'react-on-rails';

import ChatroomView from '../containers/ChatroomView';
import ArchiveView from '../containers/ArchiveView';

const CHATROOM_VIEW = 1
const ARCHIVE_VIEW = 2

class TeacherView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: props.initialTab,
      name: props.name,
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

  updateName = name => {
    this.setState({ name });
  }

  render() {
    const tabProps = Object.assign({}, this.props, {
      updateName: this.updateName,
      name: this.state.name
    })
    const { tab } = this.state

    return <div>
      <div className="tab-container">
        <div className="tab tab-chatroom-view"
          onClick={e => this.setState({ tab: CHATROOM_VIEW })}
        >
          Create new videos
        </div>
        <div className="tab tab-archive-view"
          onClick={e => this.setState({ tab: ARCHIVE_VIEW })}
        >
          See your past videos
        </div>
      </div>
      <ChatroomView {...tabProps} updateVideoList={this.fetchVideos} visible={tab === CHATROOM_VIEW} />
      <ArchiveView {...tabProps} videos={this.state.videos} visible={tab === ARCHIVE_VIEW} />
    </div>
  }
}

ReactOnRails.register({ TeacherView });
