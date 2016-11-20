import React, { PropTypes } from 'react';
import Video from '../components/Video'

class ArchiveView extends React.Component {
  render() {
    const { name, visible } = this.props;

    return (
      <div className="container archive" style={{ display: visible ? 'block' : 'none' }}>
        <div className="archive-title">
          {name}'s videos
        </div>
        {this.props.videos.map((video, index) => {
          return <Video key={index} video={video} />
        })}
      </div>
    );
  }
}

ArchiveView.propTypes = {
  name: PropTypes.string.isRequired
};

export default ArchiveView
