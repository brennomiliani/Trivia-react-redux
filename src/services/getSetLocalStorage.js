export const getTokenFromStorage = () => {
  const result = localStorage.getItem('token');
  return result;
};

export const getPlayerFromStorage = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};

const setRankingToStorage = (newRanking) => localStorage
  .setItem('ranking', JSON.stringify(newRanking));

export const setTokenOnStorage = (name, value) => {
  if (name === 'ranking') {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    if (value) {
      const rankingStored = getPlayerFromStorage();
      setRankingToStorage([...rankingStored, value]);
    }
  } else {
    localStorage.setItem(name, JSON.stringify(value));
  }
};
