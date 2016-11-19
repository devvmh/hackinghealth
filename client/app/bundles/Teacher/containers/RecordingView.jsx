import React, { PropTypes } from 'react';

class RecordingView extends React.Component {
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
      </div>
    );
  }
}

RecordingView.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default RecordingView
