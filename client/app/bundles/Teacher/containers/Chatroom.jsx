import React, { PropTypes, Component } from 'react'

class Chatroom extends Component {
  render() {
    return <div>
      Chatroom goes here.
      {this.props.recorder}
    </div>
  }
}

Chatroom.propTypes = {
  recorder: PropTypes.object
}

export default Chatroom
