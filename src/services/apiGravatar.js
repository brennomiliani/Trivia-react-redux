import md5 from 'crypto-js/md5';

const playerImgRequest = async (email) => {
  const hash = md5(email).toString();
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const data = await response.json();
  return data;
};

export default playerImgRequest;
