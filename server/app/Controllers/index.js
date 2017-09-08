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
   * @param  {Array} array
   * @return {Boolean}
   */
  validate(array) {
    return array.reduce((acc, item) => {
      const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let bool;

      switch (item.type) {
        case 'email':
          bool = email.test(item.value);
          break;
        default:
          bool = item.value !== '';
          break;
      }

      if (acc) acc = bool;

      return acc;
    }, true);
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