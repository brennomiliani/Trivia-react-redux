import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTimer, buttonDisabled, finalTimer } from '../redux/actions';

export class Timer extends Component {
  state = {
    seconds: 30,
  }

  componentDidMount = () => {
    // const { seconds } = this.state;
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatchSeconds, isAnswersDisabled, setFinalTimer } = this.props;
    const { seconds } = this.state;
    dispatchSeconds(seconds);
    if (prevState.seconds === 1) {
      clearInterval(this.intervalId);
      setFinalTimer(seconds);
      isAnswersDisabled(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { seconds } = this.state;
    return (
      <p>
        {seconds}
      </p>
    );
  }
}

Timer.propTypes = {
  dispatchSeconds: PropTypes.func.isRequired,
  isAnswersDisabled: PropTypes.func.isRequired,
  setFinalTimer: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  dispatchSeconds: (seconds) => dispatch(addTimer(seconds)),
  isAnswersDisabled: (isBtnDisabled) => dispatch(buttonDisabled(isBtnDisabled)),
  setFinalTimer: (seconds) => dispatch(finalTimer(seconds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
