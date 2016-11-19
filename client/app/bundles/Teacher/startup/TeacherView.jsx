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
      name: props.name
    }
  }

  updateName = name => {
    this.setState({ name });
  }

  renderTab = () => {
    const props = Object.assign({}, this.props, {
      updateName: this.updateName,
      name: this.state.name
    })

    switch(this.state.tab) {
      case RECORDING_VIEW:
        return <RecordingView {...props} />
      case CHATROOM_VIEW:
        return <ChatroomView {...props} />
      case ARCHIVE_VIEW:
        return <ArchiveView {...props} />
      default:
        return <div>Something went wrong</div>
    }
  }

  render() {
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
      {this.renderTab()}
    </div>
  }
}

ReactOnRails.register({ TeacherView });
