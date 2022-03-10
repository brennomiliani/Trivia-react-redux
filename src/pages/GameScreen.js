import React, { Component } from 'react';
import Game from '../components/Game';
import Header from '../components/Header';

export class GameScreen extends Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default GameScreen;
