import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Login extends Component {
  state = {
    playerName: '',
    playerEmail: '',
    btnDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const { playerName, playerEmail } = this.state;
    if (playerName.length > 0 && playerEmail.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  render() {
    const { playerName, playerEmail, btnDisabled } = this.state;
    return (
      <main>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              onChange={ this.handleChange }
              value={ playerName }
              name="playerName"
              type="text"
              id="input-player-name"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              onChange={ this.handleChange }
              value={ playerEmail }
              name="playerEmail"
              type="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            disabled={ btnDisabled }
            data-testid="btn-play"
            type="submit"
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Login);
