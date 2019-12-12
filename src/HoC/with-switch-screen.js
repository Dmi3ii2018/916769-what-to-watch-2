import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from "recompose";

import {SignIn} from "../components/sign-in/sign-in";
import {MainPage} from "../components/main/main";
import {withSignIn} from "../HoC/with-sign-in";

const SignInWrapped = withSignIn(SignIn);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent {
    constructor(props) {
      super(props);
      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
        isAuthorizationRequired={this.props.isAuthorizationRequired}
      />;
    }

    _getScreen() {
      if (this.props.isAuthorizationRequired) {
        return <SignInWrapped />;
      }
      return <MainPage />;
    }
  }

  WithScreenSwitch.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithScreenSwitch;
};

// export {withScreenSwitch};

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
  };
};

export default compose(
    connect(mapStateToProps),
    withScreenSwitch
);
