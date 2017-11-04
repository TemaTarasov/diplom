import ValidateRequest from '../Request';

const validate = new class extends ValidateRequest {
  get rules() {
    return {
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
    };
  }
}();

export default validate.validate.bind(validate);
