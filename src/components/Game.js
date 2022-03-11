import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTokenOnStorage } from '../services/getSetLocalStorage';
import { triviaQuestionsRequest, triviaTokenRequest } from '../services/apiTrivia';
import { addToken } from '../redux/actions';

export class Game extends Component {
  state = {
    questions: [],
    activeQuestion: 0,
    isLoading: true,
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

    // inserindo respostas incorretas no array
    const answerArr = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
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
      <div className="question-container">
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
    const correctAnswer = questions[activeQuestion].correct_answer;
    const parent = event.target.parentNode;

    parent.childNodes.forEach((answer) => {
      if (answer.innerHTML === correctAnswer) {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        answer.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

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
    const { isLoading, questions, activeQuestion } = this.state;
    return (
      <main>
        {!isLoading && this.createQuestion(questions[activeQuestion])}
        <button
          type="button"
          onClick={ () => this.setState({ activeQuestion: activeQuestion + 1 }) }
        >
          Proxima pergunta

        </button>
      </main>
    );
  }
}

Game.propTypes = {
  dispatchToken: PropTypes.func.isRequired,
  reduxToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  reduxToken: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(addToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
