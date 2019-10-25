import React from "react";
import PropTypes from "prop-types";

export const SmallMovieCard = ({name, src, onFilmCardOver}) => {
  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver={onFilmCardOver}>
      <div className="small-movie-card__image">
        <img src={`img/${src}.jpg`} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onFilmCardOver: PropTypes.func,
  onFilmCardOut: PropTypes.func,
};
