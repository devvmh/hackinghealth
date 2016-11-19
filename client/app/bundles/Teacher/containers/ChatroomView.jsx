import React, { PropTypes } from 'react';
import VideoRecorder from '../components/VideoRecorder'
import Chatroom from './Chatroom'

class ChatroomView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { name, visible } = this.props;
    return (
      <div className="container" style={{ display: visible ? 'block' : 'none' }}>
        <h3>
          Hello, {name}!
        </h3>
        <hr />
        <Chatroom recorder={<VideoRecorder updateVideoList={this.props.updateVideoList} />} />
      </div>
    );
  }
}

ChatroomView.propTypes = {
  updateVideoList: PropTypes.func.isRequired
};

export default ChatroomView
