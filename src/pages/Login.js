import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { triviaTokenRequest } from '../services/apiTrivia';
import { addPlayerInfos, addToken } from '../redux/actions/index';
import { setTokenOnStorage } from '../services/getSetLocalStorage';
import image from '../trivia.png';

export class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    btnDisabled: true,
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { addPlayerToGlobalState, addTokenToGlobalState, history } = this.props;
    const newToken = await this.getToken();
    const { name, gravatarEmail } = this.state;
    const player = { name, gravatarEmail, assertions: 0, score: 0 };
    addPlayerToGlobalState(player);
    addTokenToGlobalState(newToken);

    setTokenOnStorage('token', newToken.token);

    history.push('/game');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { name: nameState, gravatarEmail } = this.state;
      if (nameState.length > 0 && gravatarEmail.length > 0) {
        this.setState({
          btnDisabled: false,
        });
      }
    });
  }

  getToken = async () => {
    const token = await triviaTokenRequest();
    return token;
  };

  render() {
    const { name, gravatarEmail, btnDisabled } = this.state;
    const { history } = this.props;
    return (
      <main className="d-flex flex-column align-items-center mt-5">
        <img className="img-fluid w-25 mt-5 mb-2" src={ image } alt="Trivia Logo" />

        <form className="p-5 d-flex flex-column align-items-center">
          <div className="mb-3">

            <label className="form-label" htmlFor="input-player-name">
              Nome:
              <input
                className="form-control"
                onChange={ this.handleChange }
                value={ name }
                name="name"
                type="text"
                id="input-player-name"
                data-testid="input-player-name"
              />
            </label>
          </div>

          <div className="mb-3">

            <label className="form-label" htmlFor="input-gravatar-email">
              Email:
              <input
                className="form-control"
                onChange={ this.handleChange }
                value={ gravatarEmail }
                name="gravatarEmail"
                type="email"
                id="input-gravatar-email"
                data-testid="input-gravatar-email"
              />
            </label>
          </div>
          <div>

            <button
              className="btn btn-primary me-3"
              disabled={ btnDisabled }
              data-testid="btn-play"
              type="submit"
              onClick={ this.handleSubmit }
            >
              Play
            </button>

            <button
              className="btn btn-primary"
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Settings
            </button>
          </div>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerToGlobalState: (state) => dispatch(addPlayerInfos(state)),
  addTokenToGlobalState: (state) => dispatch(addToken(state)),
});

Login.propTypes = {
  addPlayerToGlobalState: PropTypes.func.isRequired,
  addTokenToGlobalState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
