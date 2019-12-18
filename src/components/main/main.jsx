import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {FilmsList} from "../films-list/films-list";
import {GenresList} from "../../components/geners-list/genres-list";
import {Operation} from "../../reducer/root-reducer";

export class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
    };
  }

  _promoFilmToFilm(promoId, filmList) {
    console.log(this.props);
    const film = filmList.find((it) => {
      return it.id === promoId;
    });
    return film;
  }

  render() {
    const {filmData, onHeaderClick, promoFilm, isAuthorizationRequired, renderFavoriteFilms} = this.props;
    console.log(this.props);
    const promoInFilmList = this._promoFilmToFilm(promoFilm.id, filmData);
    console.log(promoInFilmList);
    const posterBackgroundColor = {
      backgroundColor: promoFilm.background_color,
    };

    return <>
    <section className="movie-card" style={posterBackgroundColor}>
      <div className="movie-card__bg">
        <img src={`${promoFilm.background_image}`} alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        {isAuthorizationRequired
          ? <div className="user-block">
            <Link to="/login" className="user-block__link">Sign in</Link>
          </div>
          : <div className="user-block">
            <div className="user-block__avatar">
              <Link to="/mylist">
                <img src={`https://htmlacademy-react-2.appspot.com${this.props.avatarSrc}`} alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </div>
        }

      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={`${promoFilm.poster_image}`} alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title" onClick={onHeaderClick}>{promoFilm.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.genre}</span>
              <span className="movie-card__year">{promoFilm.released}</span>
            </p>

            <div className="movie-card__buttons">
              <Link to="/films/{promoFilm.id}/player" className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>

              {promoFilm.is_favorite
                ? <button onClick={() => {
                  console.log("321");
                  // checkSignInAuth(isAuthorizationRequired);
                  this.setState({isFavorite: false});
                  this.props.setFavorite(promoFilm.id, promoFilm.is_favorite);
                }} className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  <span>My list</span>
                </button>
                : <button onClick={() => {
                  console.log("123");
                  // checkSignInAuth(isAuthorizationRequired);
                  this.setState({isFavorite: true});
                  this.props.setFavorite(promoFilm.id, promoFilm.is_favorite);
                }} className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              }

            </div>
          </div>
        </div>
      </div>
    </section>
  <div className="page-content">
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList />

      <div className="catalog__movies-list">
        <FilmsList
          films = {filmData}
        />
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>

    <footer className="page-footer">
      <div className="logo">
        <a className="logo__link logo__link--light">
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

const mapStateToProps = (state) => ({
  avatarSrc: state.authorizationReducer.avatar_url,
  isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
  promoFilm: state.filterReducer.promoFilm,
  filmData: state.filterReducer.filmsList,
});

const mapDispatchToProps = (dispatch) => ({
  setFavorite: (id, status) => {
    dispatch(Operation.postFavoriteFilms(id, status));
  },
});

export const MainPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

Main.propTypes = {
  onHeaderClick: PropTypes.func,
  filmData: PropTypes.array,
  avatarSrc: PropTypes.string,
  isAuthorizationRequired: PropTypes.bool,
  promoFilm: PropTypes.object.isRequired,
  setFavorite: PropTypes.func.isRequired,
};
