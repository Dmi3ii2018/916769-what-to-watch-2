import React from "react";
import {SmallMovieCard} from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

export class FilmsList extends React.PureComponent {
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
      key = {`${film.id}`}
      name = {film.name}
      img = {film.img}
      id = {film.id}
      onFilmCardOver = {this.cardOverHandler}
      onFilmCardOut = {this.cardOutHandler}
    />);
  }
}

FilmsList.propTypes = {
  films: PropTypes.array,
};
