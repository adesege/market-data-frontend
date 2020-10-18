import axios from 'axios';

const setAuthorizationToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationToken;
