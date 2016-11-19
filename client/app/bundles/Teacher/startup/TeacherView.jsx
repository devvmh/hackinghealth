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
      tab: props.initialTab
    }
  }

  render() {
    switch(this.state.tab) {
      case RECORDING_VIEW:
        return <RecordingView {...this.props} />
      case CHATROOM_VIEW:
        return <ChatroomView {...this.props} />
      case ARCHIVE_VIEW:
        return <ArchiveView {...this.props} />
      default:
        return <div>Something went wrong</div>
    }
  }
}

ReactOnRails.register({ TeacherView });
