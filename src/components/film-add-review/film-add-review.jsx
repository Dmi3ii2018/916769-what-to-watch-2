import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter, Link, Redirect} from "react-router-dom";
import {Operation} from "../../reducer/root-reducer";

class FilmAddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      comment: ``,
      film: this.props.location.state,
      isSuccessfull: ``,
      isButtonDisable: false,
    };
  }

  _ratingHandler(rating) {
    this.setState({
      rating: rating.value,
    });
  }

  _inputHandler(data) {
    this.setState({
      comment: data.value,
    });
  }

  render() {
    const {avatarSrc, submitHandler} = this.props;
    const {rating, comment, film, isSuccessfull} = this.state;

    if (isSuccessfull) {
      return <Redirect to="films/{film.id}" />;
    }

    const posterBackgroundColor = {
      backgroundColor: film.background_color,
    };

    return <section className="movie-card movie-card--full" style={posterBackgroundColor}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={`${film.background_image}`} alt={`${film.name}`} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{film.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <Link to="/mylist">
                <img src={`https://htmlacademy-react-2.appspot.com${avatarSrc}`} alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={`${film.poster_image}`} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars" onChange={(evt) => this._ratingHandler(evt.target)}>
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" onChange={(evt) => this._inputHandler(evt.target)} minLength="50" maxLength="400" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button onClick={(evt) => {
                evt.preventDefault();
                this.setState({isButtonDisable: true});
                submitHandler(rating, comment, film.id)
                  .then(() => {
                    this.setState({isSuccessfull: true});
                  })
                  .catch(() =>{
                    this.setState({isButtonDisable: false});
                  });
              }} className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>;
  }
}

FilmAddReview.propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  submitHandler: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    avatarSrc: state.authorizationReducer.avatar_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (rating, submit, id) => {
      return dispatch(Operation.postComments(rating, submit, id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilmAddReview));
