import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from "recompose";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";

import {SignIn} from "../components/sign-in/sign-in";
import {MainPage} from "../components/main/main";
import withSignIn from "../HoC/with-sign-in";
import FilmAddReview from "../components/film-add-review/film-add-review";
import withFilmOverview from "../HoC/switch-overview-screen";
import {FilmOverview} from "../components/film-overview/film-overview";
import MyFilmList from "../components/my-film-list/my-film-list";
import {Operation} from '../reducer/root-reducer';
import VideoPlayer from "../components/player/player";

const SignInWrapped = withSignIn(SignIn);
const FilmOverviewWrapped = withFilmOverview(FilmOverview);

export const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);
      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      const {id, isAuthorizationRequired, getComments} = this.props;
      return <Switch>
        <Route path="/" exact render={() => <Component
          {...this.props}
          renderScreen={this._getScreen}
        />} />
        <Route path="/films/:id/player" exact render={() => <VideoPlayer
          {...this.props}
          id = {id}
        />} />
        <Route path="/login" component={SignInWrapped} />
        <Route path="/films/:id/addreview" exact component={FilmAddReview} />
        <Route path="/mylist" component={MyFilmList} />
        <Route path="/films/:id" render={() => <FilmOverviewWrapped
          {...this.props}
          id = {id}
          comments={getComments(id)}
        />} />
        {/* <PrivateRoute path="/mylist" isAuth={isAuthorizationRequired} component={MyFilmList} /> */}
        <Route path="/log">
          {isAuthorizationRequired ? <Redirect to="/login" /> : <Redirect to="this.props.match.path" />}
        </Route>
      </Switch>;
    }

    _getScreen() {
      return <MainPage />;
    }
  }

  WithScreenSwitch.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
    id: PropTypes.number,
    getComments: PropTypes.func,
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state) => {
  return {
    id: state.filterReducer.choosenFilmId,
    isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (id) => {
      dispatch(Operation.loadComments(id));
    }
  };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
