import React from "react";
import {SmallMovieCard} from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilmsListByGenre} from "../../selectors/genre-selector";
// import {INITIAL_GENRE} from "../../reducer/reducer";

// const filterFilmsList = (state) => {
//   if (state.genre !== INITIAL_GENRE) {
//     const filteredFilmsList = state.filmsList.filter((film) => film.genre === state.genre);
//     return filteredFilmsList;
//   }
//   return state.filmsList;
// };

export class Films extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: -1,
    };

    this.cardOverHandler = this.cardOverHandler.bind(this);
    this.cardOutHandler = this.cardOutHandler.bind(this);
  }

  cardOverHandler(id) {
    this.setState({activeCardId: id});
  }

  cardOutHandler() {
    this.setState({activeCardId: -1});
  }

  render() {
    const {films} = this.props;

    return films.map((film) => <SmallMovieCard
      key = {film.id}
      name = {film.name}
      img = {film.preview_image}
      poster = {film.poster_image}
      id = {film.id}
      preview={film.preview_video_link}
      onFilmCardOver = {this.cardOverHandler}
      onFilmCardOut = {this.cardOutHandler}
    />);
  }
}

Films.propTypes = {
  films: PropTypes.array,
};

const mapStateToProps = (state) => ({
  films: getFilmsListByGenre(state),
});

export const FilmsList = connect(mapStateToProps)(Films);
