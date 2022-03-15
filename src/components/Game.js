import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTokenOnStorage } from '../services/getSetLocalStorage';
import { triviaQuestionsRequest, triviaTokenRequest } from '../services/apiTrivia';
import { addToken, buttonDisabled, addTimer, addPlayerInfos } from '../redux/actions';
import './styles/Game.css';

export class Game extends Component {
  state = {
    questions: [],
    activeQuestion: 0,
    isLoading: true,
    wasAnswered: false,
    playerScore: 0,
    assertions: 0,
  }

  componentDidMount = async () => {
    const { reduxToken, dispatchToken } = this.props;
    const result = await triviaQuestionsRequest(reduxToken);
    const { results, response_code: code } = result;

    // caso erro na request
    const ERROR_CODE = 3;
    if (code === ERROR_CODE) {
      const newTokenRequest = await triviaTokenRequest();
      const newQuestions = await triviaQuestionsRequest(newTokenRequest.token);
      setTokenOnStorage('token', newTokenRequest.token);
      dispatchToken(newTokenRequest);
      this.setState(
        {
          questions: newQuestions.results,
          isLoading: false,
        },
      );
    } else {
      // caso a request for bem sucedida
      this.setState({ questions: results, isLoading: false });
    }
  }

  randomizeAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    const { answerIsDisabled } = this.props;
    // inserindo respostas incorretas no array
    const answerArr = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          disabled={ answerIsDisabled }
          className="default-answer"
          onClick={ this.handleClick }
          type="button"
          key={ index }
          data-testid={ dataTestId }
        >
          {answer}

        </button>
      );
    });

    // inserindo a resposta correta no array
    answerArr.push(
      <button
        disabled={ answerIsDisabled }
        className=""
        onClick={ this.handleClick }
        type="button"
        key="correct"
        data-testid="correct-answer"
      >
        {correct}
      </button>,
    );

    // randomizando respostas do array
    this.shuffle(answerArr);

    return answerArr;
  }

  createQuestion = (question) => {
    const answers = this.randomizeAnswers(question);
    return (
      <div className="">
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {answers}
        </div>
      </div>
    );
  }

  handleClick = (event) => {
    const { questions, activeQuestion } = this.state;
    const { isAnswersDisabled, timer, addPlayerPoints } = this.props;
    const correctAnswer = questions[activeQuestion].correct_answer;
    const parent = event.target.parentNode;
    this.setState({ wasAnswered: true });
    isAnswersDisabled(true);
    parent.childNodes.forEach((answer) => {
      if (answer.innerHTML === correctAnswer) {
        answer.className = 'correct-answer';
      } else {
        answer.className = 'incorrect-answer';
      }
    });
    if (event.target.className === 'correct-answer') {
      const SCORE_BASE = 10;
      const SCORE_HARD = 3;
      const SCORE_MEDIUM = 2;
      const SCORE_EASY = 1;
      const { difficulty } = questions[activeQuestion];
      let difficultyPoints = 0;
      if (difficulty === 'hard') {
        difficultyPoints = SCORE_HARD;
      } if (difficulty === 'medium') {
        difficultyPoints = SCORE_MEDIUM;
      } if (difficulty === 'easy') {
        difficultyPoints = SCORE_EASY;
      }
      const questionScore = SCORE_BASE + (timer * difficultyPoints);
      const { playerScore, assertions } = this.state;
      const newScore = playerScore + questionScore;
      this.setState({ playerScore: newScore, assertions: assertions + 1 }, () => {
        const obj = { score: newScore, assertions: assertions + 1 };
        addPlayerPoints(obj);
      });
    }
  }

    nextQuestion = () => {
      const { activeQuestion, wasAnswered } = this.state;
      const { history, isAnswersDisabled, dispatchSeconds } = this.props;
      const MAX_QUESTIONS = 4;
      if (wasAnswered) {
        const correctButton = document.querySelector('.correct-answer');
        const incorrectButtons = document.querySelectorAll('.incorrect-answer');
        const answerButtons = [...incorrectButtons, correctButton];
        answerButtons.forEach((answer) => { answer.className = 'default-answer'; });
      }
      if (activeQuestion < MAX_QUESTIONS) {
        const SECONDS_PER_QUESTION = 30;
        isAnswersDisabled(false);
        dispatchSeconds(SECONDS_PER_QUESTION);
        this.setState({ activeQuestion: activeQuestion + 1, wasAnswered: false });
      }
      if (activeQuestion === MAX_QUESTIONS) {
        history.push('/feedback');
      }
    };

    // Ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=scoredesc#tab-top
    shuffle(array) {
      let currentIndex = array.length; let
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
      // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    render() {
      const { isLoading, questions, activeQuestion, wasAnswered } = this.state;
      const { timer } = this.props;

      const nextQuestion = (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Proxima pergunta
        </button>
      );
      return (
        <main>
          {!isLoading && this.createQuestion(questions[activeQuestion])}
          { timer === 0 || wasAnswered ? nextQuestion : <p>Responda a pergunta</p>}
        </main>
      );
    }
}

Game.propTypes = {
  answerIsDisabled: PropTypes.bool.isRequired,
  dispatchSeconds: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isAnswersDisabled: PropTypes.func.isRequired,
  reduxToken: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  reduxToken: state.token,
  timer: state.timer.finalSeconds,
  answerIsDisabled: state.timer.answersAreDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(addToken(token)),
  dispatchSeconds: (seconds) => dispatch(addTimer(seconds)),
  isAnswersDisabled: (isBtnDisabled) => dispatch(buttonDisabled(isBtnDisabled)),
  addPlayerPoints: (points) => dispatch(addPlayerInfos(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
