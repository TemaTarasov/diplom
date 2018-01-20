export default class {
  /**
   * @param {array}    array
   * @param {function} callback
   */
  foreach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
};
