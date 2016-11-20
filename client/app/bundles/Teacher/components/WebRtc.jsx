import React from 'react'
import ReactDOM from 'react-dom'

class WebRtc extends React.Component {
  constructor(props) {
    super(props);
    this.addVideo = this.addVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.readyToCall = this.readyToCall.bind(this);
  }

  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: ReactDOM.findDOMNode(this.refs.remotes),
      url: this.props.options.signalmasterUrl,
      autoRequestMedia: true
    });

    console.log("webrtc component mounted");
    this.webrtc.on('JOIN_CALL', this.addVideo);
    this.webrtc.on('LEAVE_CALL', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

  addVideo(video, peer) {
    console.log('video added', peer);
    //  console.log(this.refs.remotes);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    console.log(remotes);
    if (remotes) {
      var container = document.createElement('div');
      container.className = 'videoContainer';
      container.id = 'container_' + this.webrtc.getDomId(peer);
      container.appendChild(video);
      // suppress contextmenu
      video.oncontextmenu = function() {
        return false;
      };
      console.log(container);
      remotes.appendChild(container);
    }
  }

  removeVideo(video, peer) {
    console.log('video removed ', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  readyToCall() {
    console.log("joining room:", this.props.options.roomname)
    return this.webrtc.joinRoom(this.props.options.roomname);
  }

  connect() {
    console.log("connected");
  }

  disconnect() {
    console.log("disconnected");
  }

  render() {
    return <div>
      <video className="local"
        id = "localVideo"
        ref = "local"
      />
      <div className="remotes"
        id="remoteVideos"
        ref="remotes"
      />
    </div>
  }
}

export default WebRtc
