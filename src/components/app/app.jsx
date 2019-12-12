// import PropTypes from 'prop-types';

export const App = (props) => {
  const {renderScreen, isAuthorizationRequired} = props;
  return renderScreen(isAuthorizationRequired);
};

// App.propTypes = {
//   renderScreen: PropTypes.func,
//   isAuthorizationRequired: PropTypes.bool,
// };

