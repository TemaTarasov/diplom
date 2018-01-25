import Request from '../Request';

export default Request({
  login: {
    required: true
  },
  email: {
    type: 'email',
    required: true
  },
  password: {
    required: true,
    min: 6
  }
});
