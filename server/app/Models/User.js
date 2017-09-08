import mongoose from 'mongoose';
import Model from './index';

class User extends Model {
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
}

export default new User();
