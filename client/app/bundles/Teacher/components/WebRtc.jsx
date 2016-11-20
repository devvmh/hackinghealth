import React from 'react'
import ReactDOM from 'react-dom'

class WebRtc extends React.Component {
  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: ReactDOM.findDOMNode(this.refs.remotes),
      url: this.props.options.signalmasterUrl,
      autoRequestMedia: true
    });

    console.log("webrtc component mounted");
    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('videoRemoved', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

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
    }
  }

  removeVideo = (video, peer) => {
    console.log('video removed ', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  readyToCall = () => {
    console.log("joining room:", this.props.options.roomname)
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

      const formData = new FormData();
      formData.append('video[file]', blob)

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
      }).catch(error => {
        console.error(error)
      })
    }
    return this.webrtc.joinRoom(this.props.options.roomname);
  }

  connect() {
    console.log("connected");
  }

  disconnect() {
    console.log("disconnected");
  }

  startRecording = () => {
    window.local_recorder.start()
    this.props.updateCurrentlyRecording(true)
  }

  stopRecording = () => {
    window.local_recorder.stop()
    this.props.updateCurrentlyRecording(false)
  }

  render() {
    return <div>
      <video className="local"
        id="localVideo"
        ref="local"
      />
      <div onClick={this.startRecording}>Start Recording</div>
      <div onClick={this.stopRecording}>Stop Recording</div>
      <div className="remotes"
        id="remoteVideos"
        ref="remotes"
      />
    </div>
  }
}

export default WebRtc
