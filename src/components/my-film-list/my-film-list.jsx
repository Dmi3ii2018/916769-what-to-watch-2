import React from 'react';
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import SmallMovieCard from "../small-movie-card/small-movie-card";

const getFavoriteFilms = (state) => {
  const films = state.filterReducer.filmsList;
  const favoriteFilms = films.filter((it) => {
    return it.is_favorite === true;
  });
  return favoriteFilms;
};

const MyFilms = (props) => {
  const {favoriteFilms} = props;

  return <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <div className="user-block">
        <div className="user-block__avatar">
          <img src={`https://htmlacademy-react-2.appspot.com${props.avatarSrc}`} alt="User avatar" width="63" height="63" />
        </div>
      </div>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <div className="catalog__movies-list">
        {favoriteFilms.map((film) => <SmallMovieCard
          key = {film.id}
          name = {film.name}
          img = {film.preview_image}
          poster = {film.poster_image}
          id = {film.id}
          preview={film.preview_video_link}
        />)
        }
      </div>
    </section>

    <footer className="page-footer">
      <div className="logo">
        <a href="main.html" className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div>;
};

const mapStateToProps = (state) => ({
  avatarSrc: state.authorizationReducer.avatar_url,
  favoriteFilms: getFavoriteFilms(state),
});


export default withRouter(connect(mapStateToProps)(MyFilms));

MyFilms.propTypes = {
  favoriteFilms: PropTypes.array,
  avatarSrc: PropTypes.string.isRequired,
};
