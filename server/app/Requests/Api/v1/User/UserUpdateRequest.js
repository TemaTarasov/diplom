import Request from '../Request';

export default Request({
  email: {
    type: 'email'
  },
  password: {
    min: 6
  }
});
