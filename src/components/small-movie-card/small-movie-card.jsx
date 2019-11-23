import React from "react";
import PropTypes from "prop-types";

export const SmallMovieCard = ({name, img, id, onFilmCardOver, onFilmCardOut}) => {
  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => onFilmCardOver(id)}
      onMouseOut={onFilmCardOut}>
      <div className="small-movie-card__image">
        <img src={`img/${img}.jpg`} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onFilmCardOver: PropTypes.func,
  onFilmCardOut: PropTypes.func,
};
