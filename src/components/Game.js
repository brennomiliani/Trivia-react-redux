import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTokenFromStorage, setTokenOnStorage } from '../services/getSetLocalStorage';
import { triviaQuestionsRequest, triviaTokenRequest } from '../services/apiTrivia';

export class Game extends Component {
  state = {
    token: '',
    questions: [],
    activeQuestion: 0,
  }

  componentDidMount = async () => {
    // caso a request for bem sucedida
    const token = getTokenFromStorage();
    const { results, response_code: { code } } = await triviaQuestionsRequest(token);
    this.setState({ questions: results, token });

    // caso erro na request
    const ERROR_CODE = 3;
    if (code === ERROR_CODE) {
      const newTokenRequest = await triviaTokenRequest();
      const newQuestions = await triviaQuestionsRequest(newTokenRequest.token);
      setTokenOnStorage('token', newTokenRequest.token);
      this.setState({ questions: newQuestions, token: newTokenRequest.token });
    }
  }

  randomizeAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;

    // inserindo respostas incorretas no array
    const answerArr = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button type="button" key={ index } data-testid={ dataTestId }>{answer}</button>
      );
    });

    // inserindo a resposta correta no array
    answerArr.push(<button type="button" data-testid="answer-options">{correct}</button>);

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
        {answers}
      </div>
    );
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
    const { token, questions, activeQuestion } = this.state;
    return (
      <main>
        {token && this.createQuestion(questions[activeQuestion])}
      </main>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
