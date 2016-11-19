import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

class RecordingView extends React.Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    debugger
  }

  render() {
    const { name } = this.props;
    return (
      <div className="container">
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
