import React from "react";
import PropTypes from "prop-types";
import {VideoPreview} from "../video-preview/video-preview";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/root-reducer";

class SmallMovieCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPreviewPlaying: false,
      isCardClicked: this.props.isClicked,
    };

    this._filmCardOverHandler = this._filmCardOverHandler.bind(this);
    this._filmCardOutHandler = this._filmCardOutHandler.bind(this);
  }

  _filmCardOverHandler() {
    // this.props.onFilmCardOver(id);
    this.setState({isVideoPreviewPlaying: true});
  }

  _filmCardOutHandler() {
    // this.props.onFilmCardOut();
    this.setState({isVideoPreviewPlaying: false});
  }

  render() {
    const {name, img, id, preview, setCardClicked} = this.props;
    const {isVideoPreviewPlaying, isCardClicked} = this.state;

    if (isCardClicked) {
      return <Redirect to={`/films/${id}`} />;
    }

    return <article onClick={() => {
      setCardClicked(id);
      this.setState({isCardClicked: true});
    }}
    className="small-movie-card catalog__movies-card"
    onMouseOver={() => this._filmCardOverHandler(id)}
    onMouseOut={this._filmCardOutHandler}>
      {isVideoPreviewPlaying
        ? <VideoPreview
          previewSrc={preview} />
        : <>
          <div className="small-movie-card__image">
            <img src={img} alt={name} width="280" height="175" />
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
  poster: PropTypes.string,
  preview: PropTypes.string.isRequired,
  choosenFilm: PropTypes.number.isRequired,
  onFilmCardOver: PropTypes.func,
  onFilmCardOut: PropTypes.func,
  setCardClicked: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  choosenFilm: state.filterReducer.choosenFilmId,
});

const mapDispatchToProps = (dispatch) => ({
  setCardClicked: (id) => {
    dispatch(ActionCreator.chooseFilm(id));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmallMovieCard));
