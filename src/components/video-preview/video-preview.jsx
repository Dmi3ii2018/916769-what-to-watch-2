import React from "react";
import PropTypes from "prop-types";

export class VideoPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  // componentDidMount() {
  //   const video = this._videoRef.current;

  //   if (this.props.isPlaying) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  // }

  render() {
    const {previewSrc} = this.props;
    return <video ref={this._videoRef} autoPlay muted src={`${previewSrc}`} className="player__video">Your browser does not support the video tag.</video>;
  }
}

VideoPreview.propTypes = {
  previewSrc: PropTypes.string.isRequired,
};
