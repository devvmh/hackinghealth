import React, { PropTypes } from 'react';
import VideoRecorder from '../components/VideoRecorder'

class ChatroomView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { name, visible } = this.props;

    return (
      <div className="container chatroom" style={{ display: visible ? 'block' : 'none' }}>
        <div className="left-col">
          <div className="messages" />
          <div className="send-text" />
        </div>
        <div className="right-col">
          <VideoRecorder roomname={this.props.name}
            assets={this.props.assets}
            signalmasterUrl={this.props.signalmasterUrl}
            updateVideoList={this.props.updateVideoList}
          />
          <div className="participants" />
        </div>
      </div>
    );
  }
}

ChatroomView.propTypes = {
  name: PropTypes.string,
  signalmasterUrl: PropTypes.string,
  updateVideoList: PropTypes.func.isRequired
};

export default ChatroomView
