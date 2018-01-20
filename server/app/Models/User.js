import mongoose from 'mongoose';
import Model from './index';

export default new class extends Model {
  constructor() {
    super();

    this.schema = this.createScheme('users', {
      login: {
        type: String,
        unique: true
      },
      email: {
        type: String,
        unique: true
      },
      password: {
        type: String
      }
    });
  }
}();
