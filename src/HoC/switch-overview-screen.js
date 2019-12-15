import React from 'react';
import {Switch, Route, Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import SmallMovieCard from "../components/small-movie-card/small-movie-card";
import {FilmDetails} from "../components/film-details/film-details";

const withFilmOverview = (Component) => {

  class WithFilmOverview extends React.PureComponent {
    constructor(props) {
      super(props);
    }

    _getFilmById() {
      const {id, films} = this.props;
      const film = films.find((it) => it.id === id);
      console.log(film);
      return film;
    }

    _getRelatedFilms() {
      const {films} = this.props;
      const choosenFilm = this._getFilmById();
      const relatedFilmsList = films.filter((it) => it.genre === choosenFilm.genre);
      return relatedFilmsList;
    }

    render() {
      const choosenFilm = this._getFilmById();
      const relatedFilms = this._getRelatedFilms();

      const posterBackgroundColor = {
        backgroundColor: choosenFilm.background_color,
      };

      return <>
      <section className="movie-card movie-card--full" style={posterBackgroundColor}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={`${choosenFilm.background_image}`} alt={`${choosenFilm.name}`} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            {this.props.isAuthorizationRequired
              ? <div className="user-block">
                <Link to="/login" className="user-block__link">Sign in</Link>
              </div>
              : <div className="user-block">
                <div className="user-block__avatar">
                  <img src={`https://htmlacademy-react-2.appspot.com${this.props.avatarSrc}`} alt="User avatar" width="63" height="63" />
                </div>
              </div>
            }
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{choosenFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{choosenFilm.genre}</span>
                <span className="movie-card__year">{choosenFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                {choosenFilm.is_favorite
                  ? <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  : <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                }

                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={`${choosenFilm.poster_image}`} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <Link to="/films/:id/overview" className="movie-nav__link">Overview</Link>
                  </li>
                  <li className="movie-nav__item">
                    <Link to="/films/details" className="movie-nav__link">Details</Link>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>
              <Switch>
                <Route to="/films/:id/overview" render={() => <Component
                  {...this.props}
                  film = {choosenFilm}
                />} />
                <Route to="/films/details" render={() => <FilmDetails
                  {...this.props}
                  film = {choosenFilm}
                />} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            {relatedFilms.map((film) => <SmallMovieCard
              key = {film.id}
              name = {film.name}
              img = {film.preview_image}
              poster = {film.poster_image}
              id = {film.id}
              preview={film.preview_video_link}
            />)}
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
      </div>
      </>;
    }
  }

  WithFilmOverview.propTypes = {
    id: PropTypes.number,
    films: PropTypes.array,
    avatarSrc: PropTypes.string,
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithFilmOverview;
};

const mapStateToProps = (state) => {
  return {
    films: state.filterReducer.filmsList,
    avatarSrc: state.authorizationReducer.avatar_url,
    isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
  };
};

export default compose(
    connect(mapStateToProps),
    withFilmOverview
);
