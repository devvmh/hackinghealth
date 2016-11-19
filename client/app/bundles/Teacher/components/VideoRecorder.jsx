import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

class VideoRecorder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentlyUploading: false
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.error('rejected files:', rejectedFiles)
    }

    const formData = new FormData();
    formData.append('video[file]', acceptedFiles[0])

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
      console.log("success!!!!!")
      console.log(payload)
      this.props.updateVideoList()
      this.setState({ currentlyUploading: false })
    }).catch(error => {
      console.error(error)
      this.setState({ currentlyUploading: false })
    })
  }

  render() {
    if (this.state.currentlyUploading === true) {
      return <div className="upload-video disabled">
        <div className="upload-video-text">Video is uploading...</div>
      </div>
    } else {
      return <div className="upload-video">
        <Dropzone className="dropzone" onDrop={this.onDrop}>
          <div className="upload-video-text">Click here to upload a video</div>
        </Dropzone>
      </div>
    }
  }
}

VideoRecorder.propTypes = {
  updateVideoList: PropTypes.func.isRequired
};

export default VideoRecorder
