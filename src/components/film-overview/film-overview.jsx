import React from 'react';
import PropTypes from "prop-types";

const getRating = (scale) => {
  let rating = ``;

  if (scale >= 0 && scale < 3) {
    rating = `Bad`;
  }
  if (scale >= 3 && scale < 5) {
    rating = `Normal`;
  }
  if (scale >= 5 && scale < 8) {
    rating = `Good`;
  }
  if (scale >= 8 && scale < 10) {
    rating = `Very good`;
  }
  if (scale >= 10) {
    rating = `Awesome`;
  }
  return rating;
};

export const FilmOverview = (props) => {
  const {film} = props;
  return <>
    <div className="movie-rating">
      <div className="movie-rating__score"> {film.rating} </div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getRating(film.rating)}</span>
        <span className="movie-rating__count"> {film.scores_count} </span>
      </p>
    </div>

    <div className="movie-card__text">
      {film.description}

      <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

      <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)}</strong></p>
    </div>
  </>;
};

FilmOverview.propTypes = {
  film: PropTypes.object.isRequired,
};
