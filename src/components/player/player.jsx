import React, {createRef} from 'react';
import {connect} from "react-redux";
import {withRouter, Redirect, Link} from "react-router-dom";

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this.choosenFilm = this._getFilmById(this.props.films, this.props.match.params.id);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: true,
      duration: 0,
      isFullScreen: false,
      isExitClicked: false,
    };

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }

  _getFilmById(films, paramsId) {
    const film = films.find((it) => {
      return it.id === +paramsId;
    });
    console.log(film);
    return film;
  }

  _onPlayButtonClick() {
    this.setState((prevState) => ({isPlaying: !prevState.isPlaying}));
  }

  render() {
    const {progress, isPlaying, duration, isFullScreen, isExitClicked} = this.state;

    const fullScreenStyle = {
      width: `${100}%`,
      height: `${100}%`
    };

    return <div className="player">
      <video
        ref={this._videoRef}
        // src={`${this.choosenFilm.video_link}`}
        className="player__video"
        poster={`${this.choosenFilm.background_image}`}>
        style={`${isFullScreen ? fullScreenStyle : `` }`}
      </video>

      <Link to={`films/${this.choosenFilm.id}`} type="button" onClick={() => this.setState({isExitClicked: true})} className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={`${progress}`} max={`${duration}`}></progress>
            <div className="player__toggler" style={{left: `${progress / duration * 100}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{Math.floor(duration - progress)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" onClick={this._onPlayButtonClick} className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? `#pause` : `#play-s`}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button onClick={this.setState((prevState) => ({isFullScreen: !prevState}))} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>;
  }

  componentDidMount() {
    const src = this.choosenFilm.video_link;
    const video = this._videoRef.current;
    video.src = src;
    console.dir(video);

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => this.setState({
      isPlaying: false,
    });

    video.ontimeupdate = () => this.setState({
      progress: video.currentTime
    });

    // if (this.state.isExitClicked) {
    //   return <Redirect to={`films/${this.choosenFilm.id}`} />;
    // }
    // return ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    this.setState({
      duration: video.duration,
    });

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  // componentWillUnmount() {
  //   const video = this._audioRef.current;
  //   video.oncanplaythrough = null;
  //   video.onplay = null;
  //   video.onpause = null;
  //   video.ontimeupdate = null;
  //   video.src = ``;
  // }
}

const mapStateToProps = (state) => {
  return {
    films: state.filterReducer.filmsList,
    avatarSrc: state.authorizationReducer.avatar_url,
    isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
    comments: state.filterReducer.comments,
  };
};

export default withRouter(connect(mapStateToProps)(VideoPlayer));
