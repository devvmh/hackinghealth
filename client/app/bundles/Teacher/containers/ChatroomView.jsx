import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'
import SimpleWebRTC from 'simplewebrtc'

class ChatroomView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlyUploading: false,
      currentlyRecording: false
    }
  }

  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: ReactDOM.findDOMNode(this.refs.remotes),
      url: this.props.signalmasterUrl,
      autoRequestMedia: true,
      autoRemoveVideos: false
    });

    console.log("webrtc component mounted");
    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('videoRemoved', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

  names = ['Alex', 'Sam', 'Jamie', 'Taylor', 'Jordan', 'Devon', 'Dakota']
  addVideo = (video, peer) => {
    console.log('video added', peer);
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
      $(container).append(`<div class="student-name">${this.names.shift()}</div>`)
    }
  }

  removeVideo = (video, peer) => {
    console.log('video removed ', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      const oldName = $(el).find('.student-name').text()
      this.names.push(oldName)
      remotes.removeChild(el);
    }
  }

  readyToCall = () => {
    console.log("joining room:", this.props.name)
    window.rtc_ref = this.webrtc;
    window.local_recorder = new window.MediaRecorder(window.rtc_ref.webrtc.localStreams[0])
    this.chunks = []
    window.local_recorder.ondataavailable = event => {
      this.chunks.push(event.data)
    }
    window.local_recorder.onstop = event => {
      const blob = new Blob(this.chunks, { 'type' : 'video/webm' });
      this.chunks = []
      blob.lastModifiedDate = new Date()
      blob.name = 'recording.webm'
      this.postVideoFile(blob)
    }
    return this.webrtc.joinRoom(this.props.name);
  }

  postVideoFile = file => {
    const formData = new FormData();
    formData.append('video[file]', file)

    this.setState({ currentlyUploading: true })
    fetch('/videos', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': $('meta[name="csrf-token"]').get(0).content
      },
      body: formData
    }).then(response => {
      if (!response.ok) throw response
      return response.json()
    }).then(payload => {
      console.log("upload video success!!!!!")
      console.log(payload)
      this.props.updateVideoList()
      this.props.switchToArchiveView()
      this.setState({ currentlyUploading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ currentlyUploading: false })
    })
  }

  startRecording = () => {
    window.local_recorder.start()
    this.setState({ currentlyRecording: true })
  }

  stopRecording = () => {
    window.local_recorder.stop()
    this.setState({ currentlyRecording: false })
  }

  render() {
    return (
      <div className="container chatroom" style={{ display: this.props.visible ? 'block' : 'none' }}>
        <img src={this.props.assets['Louise.jpg']} className="louise" />
        <video className="local"
          id="localVideo"
          ref="local"
        />
        <div className="grey-background" />
        {this.state.currentlyRecording ? (
          <div className="record record-stop" onClick={this.stopRecording}>
            <img alt="Stop Recording" src={this.props.assets['stop.svg']} />
          </div>
        ) : (
          <div className="record record-start" onClick={this.startRecording}>
            {this.state.currentlyUploading ? (
              <div className="uploading">Uploading...</div>
            ) : (
              <img alt="Start Recording" src={this.props.assets['record.svg']} />
            )}
          </div>
        )}
        <div className="remotes"
          id="remoteVideos"
          ref="remotes"
        />
      </div>
    );
  }
}

ChatroomView.propTypes = {
  assets: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  signalmasterUrl: PropTypes.string,
  switchToArchiveView: PropTypes.func,
  updateVideoList: PropTypes.func.isRequired
};

export default ChatroomView
