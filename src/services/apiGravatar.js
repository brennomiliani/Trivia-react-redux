import md5 from 'crypto-js/md5';

const playerImgRequest = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default playerImgRequest;
