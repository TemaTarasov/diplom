import React from 'react';

export default class extends React.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @param {Array} array
   */
  bindMethods(array) {
    this.foreach(array, method => {
      this[method] = this[method].bind(this);
    });
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