import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Game from '../components/Game';
import Header from '../components/Header';
import Timer from '../components/Timer';

export class GameScreen extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Game history={ history } />
        <Timer />
      </div>
    );
  }
}

GameScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default GameScreen;
