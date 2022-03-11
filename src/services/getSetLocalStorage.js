export const getTokenFromStorage = () => {
  const result = localStorage.getItem('token');
  return result;
};

export const setTokenOnStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const getPlayerFromStorage = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};
