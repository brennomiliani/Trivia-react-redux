import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPlayerFromStorage } from '../services/getSetLocalStorage';
import playerImgRequest from '../services/apiGravatar';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount = () => {
    const rankingLocal = getPlayerFromStorage();
    this.setState({ ranking: rankingLocal });
    // console.log(rankingLocal);
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    console.log(ranking);
    const rankingOrder = ranking.sort((a, b) => {
      if (a.score > b.score) {
        const posicion = -1;
        return posicion;
      }
      if ((a.score < b.score)) {
        const posicionOne = 1;
        return posicionOne;
      } return 0;
    }).map((player, index) => {
      const imgUrl = playerImgRequest(player.picture);
      return (
        <div className="mt-5 d-flex flex-column align-items-center" key={ index }>
          <h3 data-testid={ `player-name-${index}` }>
            {index === 0 && <span role="img" aria-label="emoji">🥇</span>}
            {index === 1 && <span role="img" aria-label="emoji">🥈</span>}
            {index === 2 && <span role="img" aria-label="emoji">🥉</span>}
            { player.name }
          </h3>
          <p data_testid={ `player-score-${index}` }>
            Pontos:
            {' '}
            { player.score }
          </p>
          <img className="rounded w-100" src={ imgUrl } alt={ player.name } />
        </div>
      );
    });

    return (
      <div className="d-flex flex-column align-items-center my-5">
        <h2
          className="mb-5"
          data-testid="ranking-title"
        >
          Ranking

        </h2>
        <div className="w-25 mx-auto d-flex flex-column align-items-center">
          { rankingOrder }
        </div>

        <button
          className="btn btn-primary mt-5 w-25"
          type="button"
          medal
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
