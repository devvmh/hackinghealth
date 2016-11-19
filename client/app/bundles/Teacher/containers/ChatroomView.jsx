import React, { PropTypes } from 'react';

class ChatroomView extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="container">
        <h3>
          {name}'s Chatroom
        </h3>
        <hr />
        <div>Chatroom will go here...</div>
      </div>
    );
  }
}

ChatroomView.propTypes = {
  name: PropTypes.string.isRequired
}

export default ChatroomView
