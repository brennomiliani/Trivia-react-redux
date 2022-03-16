import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getPlayerFromStorage } from '../services/getSetLocalStorage';

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
    }).map((player, index) => (
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{ player.name }</p>
        <p data_testid={ `player-score-${index}` }>{ player.score }</p>
        <img src={ player.picture } alt={ player.name } />
      </div>
    ));

    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <div>
          { rankingOrder }
        </div>

        <button
          type="button"
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
