import React from "react";
import {SmallMovieCard} from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const INITIAL_GENRE = `All genres`;

const filterFilmsList = (state) => {
  if (state.genre !== INITIAL_GENRE) {
    const filteredFilmsList = state.filmsList.filter((film) => film.genre === state.genre);
    return filteredFilmsList;
  }
  return state.filmsList;
};

export class Films extends React.PureComponent {

  render() {
    const {films, onFilmCardOver, onFilmCardOut} = this.props;

    return films.map((film) => <SmallMovieCard
      key = {`${film.id}`}
      name = {film.name}
      img = {film.img}
      id = {film.id}
      preview={film.preview}
      onFilmCardOver = {onFilmCardOver}
      onFilmCardOut = {onFilmCardOut}
    />);
  }
}

Films.propTypes = {
  films: PropTypes.array,
  onFilmCardOver: PropTypes.func,
  onFilmCardOut: PropTypes.func,
};

const mapStateToProps = (state) => ({
  films: filterFilmsList(state),
});

export const FilmsList = connect(mapStateToProps)(Films);
