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
    // return promise for chaining on this function
    return fetch('/videos.json', {
      credentials: 'include'
    }).then(response => {
      if (!response.ok) throw response
      return response.json()
    }).then(payload => {
      this.setState({ videos: payload })
      this.fetchVideosTimeoutId = window.setTimeout(() => this.fetchVideos(), 20 * 60 * 1000) // 20 minutes
    }).catch(error => {
      console.error(error)
      this.fetchVideosTimeoutId = window.setTimeout(() => this.fetchVideos(), 60 * 1000) // 1 minute
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
      <ChatroomView {...tabProps}
        switchToArchiveView={e => this.setState({ tab: ARCHIVE_VIEW })}
        signalmasterUrl={this.props.signalmasterUrl}
        updateVideoList={this.fetchVideos}
        visible={tab === CHATROOM_VIEW}
      />
      <ArchiveView {...tabProps}
        videos={this.state.videos}
        visible={tab === ARCHIVE_VIEW}
      />
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
    </div>
  }
}

ReactOnRails.register({ TeacherView });
