import React from 'react';

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1,
      };
    }

    render() {
      return <Component />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};
