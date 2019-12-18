export const App = (props) => {
  const {renderScreen, isAuthorizationRequired} = props;
  return renderScreen(isAuthorizationRequired);
};

