import React from "react";
import {SmallMovieCard} from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";

export class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isCardActive: false,
    };
  }

  componentWillUnmount() {
    this.setState({})
  }

  render() {
    const films = this.props;
    return films.map((film, i) => <SmallMovieCard
      key = {`${film.name}-${i}`}
      name = {film.name}
      src = {film.src}
      onFilmCardOver = {() => this.setState({isCardActive: true})}
      onFilmCardOut = {() => this.setState({isCardActive: false})}
    />);
  }
}

FilmsList.propType = {
  films: PropTypes.array.isRequired,
};
