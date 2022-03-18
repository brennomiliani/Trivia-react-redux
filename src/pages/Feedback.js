import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Header } from '../components/Header';
import HeaderComponent from '../components/HeaderComponent';

class Feedback extends Component {
  render() {
    const { score, assertions, history } = this.props;
    const assertionsNum = 3;
    return (
      <>
        <HeaderComponent />
        <main className="d-flex flex-column align-items-center mx-auto mt-5">

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
            className="btn btn-primary p-2 mb-2 w-25"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar Novamente
          </button>

          <button
            className="btn btn-primary p-2 w-25"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </main>
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
