import React from "react";
import PropTypes from "prop-types";
import {VideoPreview} from "../video-preview/video-preview";

export class SmallMovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {isVideoPreviewPlaying: false};

    this._filmCardOverHandler = this._filmCardOverHandler.bind(this);
    this._filmCardOutHandler = this._filmCardOutHandler.bind(this);
  }

  _filmCardOverHandler(id) {
    this.props.onFilmCardOver(id);
    this.setState({isVideoPreviewPlaying: true});
  }

  _filmCardOutHandler() {
    this.props.onFilmCardOut();
    this.setState({isVideoPreviewPlaying: false});
  }

  render() {
    const {name, img, id, preview} = this.props;
    const {isVideoPreviewPlaying} = this.state;

    return <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => this._filmCardOverHandler(id)}
      onMouseOut={this._filmCardOutHandler}>
      {isVideoPreviewPlaying
        ? <VideoPreview
          poster={img}
          previewSrc={preview} />
        : <>
          <div className="small-movie-card__image">
            <img src={`img/${img}.jpg`} alt={name} width="280" height="175" />
          </div>
          <h3 className="small-movie-card__title">
            <a className="small-movie-card__link" href="movie-page.html">{name}</a>
          </h3>
        </>
      }
    </article>;
  }
}

SmallMovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  onFilmCardOver: PropTypes.func,
  onFilmCardOut: PropTypes.func,
};