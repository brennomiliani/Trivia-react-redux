import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerImgRequest from '../services/apiGravatar';

export class Header extends Component {
  render() {
    const { playerName, playerEmail, playerScore } = this.props;
    console.log(playerName, playerEmail, playerScore);
    return (
      <header className="d-flex align-items-center justify-content-center py-3 mb-4">
        <img
          className="me-2 rounded"
          data-testid="header-profile-picture"
          src={ playerImgRequest(playerEmail) }
          alt={ playerName }
        />
        <p className="me-2 mb-0" data-testid="header-player-name">
          { playerName }
        </p>
        <p className="me-2 mb-0" data-testid="header-score">
          Pontos:
          { ' ' }
          { playerScore }
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
