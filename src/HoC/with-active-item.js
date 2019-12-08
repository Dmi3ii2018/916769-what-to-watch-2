import React from 'react';

export const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCardId: -1,
      };

      this.cardOverHandler = this.cardOverHandler.bind(this);
      this.cardOutHandler = this.cardOutHandler.bind(this);
    }

    cardOverHandler(id) {
      this.setState({activeCardId: id});
    }

    cardOutHandler() {
      this.setState({activeCardId: -1});
    }

    render() {
      return <Component
        {...this.props}
        onFilmCardOver = {this.cardOverHandler}
        onFilmCardOut = {this.cardOutHandler}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};
