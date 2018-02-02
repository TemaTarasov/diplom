import mongoose from 'mongoose';

export default class {
  /**
   * @param  {string} name
   * @param  {object} scheme
   * @return {Model}
   */
  createScheme(name, scheme) {
    return mongoose.model(name, new mongoose.Schema(scheme));
  }

  /**
   * @param {function} callback
   */
  all(callback) {
    this.schema.find({}, callback);
  }

  /**
   * @param {object}   condition
   * @param {function} callback
   */
  find(condition, callback) {
    this.schema.find(condition, callback);
  }

  /**
   * @param {object}   condition
   * @param {function} callback
   */
  findOne(condition, callback) {
    this.schema.findOne(condition, callback);
  }

  /**
   * @param {object}   data
   * @param {function} callback
   */
  create(data, callback) {
    const created = new this.schema(data);
    const err = created.validateSync();

    if (err) {
      callback(err);
    } else {
      created.save(callback);
    }
  }

  /**
   * @param {object}   condition
   * @param {object}   data
   * @param {function} callback
   */
  update(condition, data, callback) {
    console.log(data);
    this.schema.update(condition, { $set: data }, { upsert: true }, callback);
  }

  /**
   * @param {number}   id
   * @param {object}   data
   * @param {function} callback
   */
  updateById(id, data, callback) {
    this.schema.findByIdAndUpdate(id, { $set: data }, { upsert: true }, callback);
  }

  /**
   * @param {number}   id
   * @param {function} callback
   */
  destroy(id, callback) {
    this.schema.findByIdAndRemove(id, callback);
  }
}
