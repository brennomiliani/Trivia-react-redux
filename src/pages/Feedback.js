import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions, history } = this.props;
    const assertionsNum = 3;
    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions >= assertionsNum
            ? 'Well Done!'
            : 'Could be better...'}
        </h3>
        Pontos:
        <p data-testid="feedback-total-score">
          { score }
        </p>
        Acertos:
        <p data-testid="feedback-total-question">
          { assertions }
        </p>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
