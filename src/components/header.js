import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerImgRequest from '../services/apiGravatar';

class Header extends Component {
  render() {
    const { playerName, playerEmail } = this.props;

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
        Placar:
        <p data-testid="header-score">
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
