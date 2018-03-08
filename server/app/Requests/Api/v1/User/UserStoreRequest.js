import Request from '../Request';

export default Request({
  login: 'required',
  email: 'email|required',
  password: 'min:6|required'
});
