import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from "react-redux";
// import {compose} from "recompose";
import {Switch, Route} from "react-router-dom";

import {SignIn} from "../components/sign-in/sign-in";
import {MainPage} from "../components/main/main";
import withSignIn from "../HoC/with-sign-in";

const SignInWrapped = withSignIn(SignIn);

export const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);
      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Switch>
        <Route path="/" exact render={() => <Component
          {...this.props}
          renderScreen={this._getScreen}
        />} />
        <Route path="/login" exact component={SignInWrapped} />
      </Switch>;
    }

    _getScreen() {
      // if (this.props.isAuthorizationRequired) {
      //   return <SignInWrapped />;
      // }
      return <MainPage />;
    }
  }

  WithScreenSwitch.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithScreenSwitch;
};

// export {withScreenSwitch};

// const mapStateToProps = (state) => {
//   return {
//     isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
//   };
// };

// export default compose(
//     connect(mapStateToProps),
//     withScreenSwitch
// );
