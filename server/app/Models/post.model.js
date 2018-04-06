import mongoose from 'mongoose';
import Model from './index';

export default new class extends Model {
  constructor() {
    super();

    this.schema = this.createScheme('users', {
      title: {
        type: String,
        unique: true
      },
      description: String
    });
  }
}();
