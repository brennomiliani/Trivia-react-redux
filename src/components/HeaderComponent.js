import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerImgRequest from '../services/apiGravatar';

export class Header extends Component {
  render() {
    const { playerName, playerEmail, playerScore } = this.props;
    console.log(playerName, playerEmail, playerScore);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ playerImgRequest(playerEmail) }
          alt={ playerName }
        />
        <p data-testid="header-player-name">
          { playerName }
        </p>
        Pontos:
        <p data-testid="header-score">
          {playerScore}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  playerScore: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
