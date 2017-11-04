export default class {
  /**
   * @param  {string} email
   * @return {boolean}
   */
  email(email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(email);
  }

  /**
   * @param  {string}  value
   * @param  {boolean} force
   * @return {string}
   */
  trim(value, force = false) {
    if (value) {
      const tmp = value.trim().split(' ').filter(x => x !== '');

      return force ? tmp.join('') : tmp.join(' ');
    }
  }

  /**
   * @param  {array} array
   * @return {boolean}
   */
  validate(array) {
    return array.reduce((acc, item) => {
      let bool;

      switch (item.type) {
        case 'email':
          bool = this.email(item.value);
          break;
        default:
          bool = item.value && item.value !== '';
          break;
      }

      if (acc) acc = bool;

      return acc;
    }, true);
  }

  /**
   * @param {array}    array
   * @param {function} callback
   */
  foreach(array, callback = () => { }) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
};
