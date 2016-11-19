import React, { PropTypes } from 'react';

class ArchiveView extends React.Component {
  render() {
    const { name, visible } = this.props;
    return (
      <div className="container" style={{ display: visible ? 'block' : 'none' }}>
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
