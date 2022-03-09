import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { triviaTokenRequest } from '../services/apiTrivia';
import { addPlayerInfos, addToken } from '../redux/actions/index';

export class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    btnDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { gravatarEmail } = this.state;
    if (name.length > 0 && gravatarEmail.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  getToken = async () => {
    const token = await triviaTokenRequest();
    return token;
  };

  render() {
    const { name, gravatarEmail, btnDisabled } = this.state;
    const { addPlayerToGlobalState, addTokenToGlobalState } = this.props;
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
          <Link to="/questions">
            <button
              disabled={ btnDisabled }
              data-testid="btn-play"
              type="submit"
              onClick={ () => {
                addPlayerToGlobalState(this.state);
                addTokenToGlobalState(this.state);
                console.log(this.getToken());
              } }
            >
              Play
            </button>
          </Link>
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
};

export default connect(null, mapDispatchToProps)(Login);
