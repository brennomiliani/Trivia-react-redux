import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import playerImgRequest from '../services/apiGravatar';

class Header extends Component {
  state = {
    imgUrl: '',
  };

  getImg = async () => {
    const { playerEmail } = this.props;
    const urlImg = await playerImgRequest(playerEmail);
    return urlImg;
  };

  componentDidMount = async () => {
    const imgUrl = await this.getImg();
    this.setState({ imgUrl }, () => {
      console.log(imgUrl);
    });
  }

  render() {
    const { imgUrl } = this.state;
    const { playerName } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${imgUrl}` }
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

Header.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
