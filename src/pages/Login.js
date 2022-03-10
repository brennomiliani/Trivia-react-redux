import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { triviaTokenRequest } from '../services/apiTrivia';
import { addPlayerInfos, addToken } from '../redux/actions/index';
import { setTokenOnStorage } from '../services/getSetLocalStorage';

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
    const player = { name, gravatarEmail };
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
      <main>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              onChange={ this.handleChange }
              value={ name }
              name="name"
              type="text"
              id="input-player-name"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              onChange={ this.handleChange }
              value={ gravatarEmail }
              name="gravatarEmail"
              type="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            disabled={ btnDisabled }
            data-testid="btn-play"
            type="submit"
            onClick={ this.handleSubmit }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
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
