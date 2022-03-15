import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Game from '../components/Game';
// import Header from '../components/Header';
import Timer from '../components/Timer';
import HeaderComponent from '../components/HeaderComponent';

export class GameScreen extends Component {
  render() {
    const { history, answerIsDisabled } = this.props;
    return (
      <div>
        <HeaderComponent />
        <Game history={ history } />
        {!answerIsDisabled && <Timer />}
      </div>
    );
  }
}

GameScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  answerIsDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  answerIsDisabled: state.timer.answersAreDisabled,
});

export default connect(mapStateToProps, null)(GameScreen);
