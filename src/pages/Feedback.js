import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
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
};

export default connect(mapStateToProps, null)(Feedback);
