export default class {
  /**
   * @param  {String} value
   * @param  {Boolean} forse
   * @return {String}
   */
  trim(value, forse = false) {
    const tmp = value.trim().split(' ').filter(x => x !== '');

    return forse ? tmp.join(''): tmp.join(' ');
  }

  /**
   * @param {Array} array
   * @param {Function} callback
   */
  foreach(array, callback = () => {}) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
}