import React, { PropTypes } from 'react';

class ArchiveView extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div className="container">
        <h3>
          {name}'s videos
        </h3>
        <hr />
        <div>Video archive will go here...</div>
      </div>
    );
  }
}

ArchiveView.propTypes = {
  name: PropTypes.string.isRequired
};

export default ArchiveView
