import React from 'react';
import {Operation} from "../reducer/root-reducer";
import {compose} from "recompose";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Redirect, withRouter} from "react-router-dom";

const withSignIn = (Component) => {
  class WithSignIn extends React.PureComponent {
    constructor(props) {
      super(props);
      this.handleAuthorization = this.props.handleAuthorization;

      this.state = {
        email: ``,
        password: ``,
      };

      this._submitFormHandler = this._submitFormHandler.bind(this);
      this._inputChangeHandler = this._inputChangeHandler.bind(this);
    }

    _submitFormHandler(evt) {
      evt.preventDefault();
      this.handleAuthorization(this.state);
    }

    _inputChangeHandler(evt, stateItem) {
      this.setState({[stateItem]: evt.target.value});
    }

    render() {
      if (this.props.isAuthorizationRequired === false) {
        return <Redirect to="/" />;
      }

      return <Component
        submitHandler={this._submitFormHandler}
        inputHandler={this._inputChangeHandler}
      />;
    }
  }

  WithSignIn.propTypes = {
    handleAuthorization: PropTypes.func,
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithSignIn;
};

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: state.authorizationReducer.isAuthorizationRequired,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleAuthorization: (data) => {
    dispatch(Operation.getAuthorization(data));
  }
});


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withSignIn
);
