import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerImgRequest from '../services/apiGravatar';

class header extends Component {
  componentDidMount() {
    getImg = async () => {
      const { playerEmail } = this.props;
      const urlImg = await playerImgRequest(playerEmail);
      return urlImg;
    };
  }

  render() {
    const { playerName } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.getImg() }
          alt={ playerName }
        />
        Nome:
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
const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  playerEmail: state.player.playerEmail,
});

header.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(header);
