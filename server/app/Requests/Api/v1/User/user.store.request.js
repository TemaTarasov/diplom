import Request from '../request';

export default Request({
  login: 'required',
  email: 'email|required',
  password: 'min:6|required'
});
