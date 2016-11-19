import React, { Component } from 'react';
import ReactOnRails from 'react-on-rails';

import RecordingView from '../containers/RecordingView';
import ChatroomView from '../containers/ChatroomView';
import ArchiveView from '../containers/ArchiveView';

const RECORDING_VIEW = 1
const CHATROOM_VIEW = 2
const ARCHIVE_VIEW = 3

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
        <div className="tab tab-recording-view"
          onClick={e => this.setState({ tab: RECORDING_VIEW })}
        >
          Record a Video
        </div>
        <div className="tab tab-chatroom-view"
          onClick={e => this.setState({ tab: CHATROOM_VIEW })}
        >
          Chat with students
        </div>
        <div className="tab tab-archive-view"
          onClick={e => this.setState({ tab: ARCHIVE_VIEW })}
        >
          See your past videos
        </div>
      </div>
      <RecordingView {...tabProps} updateVideoList={this.fetchVideos} visible={tab === RECORDING_VIEW} />
      <ChatroomView {...tabProps} visible={tab === CHATROOM_VIEW} />
      <ArchiveView {...tabProps} videos={this.state.videos} visible={tab === ARCHIVE_VIEW} />
    </div>
  }
}

ReactOnRails.register({ TeacherView });
