import React from "react";
import PropTypes from "prop-types";
import {setFilter, filterFilms} from "../../actions/actions";
import {connect} from "react-redux";

const INITIAL_GENRE = `All genres`;

const crateFilterList = (state) => {
  const genres = new Set();
  genres.add(INITIAL_GENRE);
  state.filmsList.forEach((it) => genres.add(it.genre));
  console.log(genres);
  console.log(state);

  return Array.from(genres);
};

const mapStateToProps = (state) => ({
  filterName: state.genre,
  filterNamesList: crateFilterList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (text) => {
    dispatch(setFilter(text));
    dispatch(filterFilms(true));
  }
});

class Genres extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {filterName, filterNamesList, onGenreClick} = this.props;

    return <ul className="catalog__genres-list">
      {filterNamesList.map((generName) =>
        <li key={generName} className={`catalog__genres-item catalog__genres-item--${generName === filterName ? `active` : ``}`}>
          <a href="#" onClick={(evt) => onGenreClick(evt.target.textContent)} className="catalog__genres-link">{generName}</a>
        </li>
      )
      }
    </ul>;
  }
}

export const GenresList = connect(mapStateToProps, mapDispatchToProps)(Genres);

Genres.propTypes = {
  filterName: PropTypes.string,
  filterNamesList: PropTypes.array,
  filmsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        genre: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
      })
  ),
  onGenreClick: PropTypes.func.isRequired,
};
