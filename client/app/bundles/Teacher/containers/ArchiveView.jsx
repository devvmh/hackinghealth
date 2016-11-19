import React, { PropTypes } from 'react';
import Video from '../components/Video'

class ArchiveView extends React.Component {

  render() {
    const { name, visible } = this.props;

    return (
      <div className="container" style={{ display: visible ? 'block' : 'none' }}>
        <h3>
          {name}'s videos
        </h3>
        <hr />
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
