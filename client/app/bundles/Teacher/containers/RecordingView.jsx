import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

class RecordingView extends React.Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    const formData = new FormData();
    formData.append('video[file]', acceptedFiles[0])
    fetch('/videos', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'multipart/form-data',
        //'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': $('meta[name="csrf-token"]').get(0).content
      },
      body: formData
    }).then(response => {
      if (!response.ok) throw response
      return response.json()
    }).then(payload => {
      console.log("success!!!!!")
      console.log(payload)
    }).catch(error => {
      console.error(error)
    })
  }

  render() {
    const { name, visible } = this.props;
    return (
      <div className="container" style={{ display: visible ? 'block' : 'none' }}>
        <h3>
          Hello, {name}!
        </h3>
        <hr />
        <div className="form-horizontal">
          <label>
            Say hello to:
          </label>
          <input
            type="text"
            value={name}
            onChange={e => this.props.updateName(e.target.value)}
          />
        </div>
        <div className="upload-video">
          <Dropzone className="dropzone" onDrop={this.onDrop}>
            <div className="upload-video-text">Video uploader</div>
          </Dropzone>
        </div>
      </div>
    );
  }
}

RecordingView.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default RecordingView
