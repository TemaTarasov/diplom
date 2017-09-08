import mongoose from 'mongoose';

export default class {
  /**
   * @param  {String} name
   * @param  {Object} scheme
   * @return {Model}
   */
  createScheme(name, scheme) {
    return mongoose.model(name, new mongoose.Schema(scheme));
  }

  /**
   * @param {Function} callback
   */
  all(callback = () => {}) {
    this.schema.find({}, callback);
  }

  /**
   * @param {Object} condition
   * @param {Function} callback
   */
  find(condition, callback = () => {}) {
    this.schema.findOne(condition, callback);
  }

  /**
   * @param {Object} data
   * @param {Function} callback
   */
  new(data, callback = () => {}) {
    const created = new this.schema(data);
    const error = created.validateSync();

    if (error) {
      callback(error);
    } else {
      created.save(callback);
    }
  }

  /**
   * @param {Number} id
   * @param {Object} data
   * @param {Function} callback
   */
  update(id, data, callback = () => {}) {
    this.schema.findByIdAndUpdate(id, { $set: data }, { upsert: true }, callback);
  }

  /**
   * @param {Number} id
   * @param {Function} callback
   */
  destroy(id, callback = () => {}) {
    this.schema.findByIdAndRemove(id, callback);
  }
}
