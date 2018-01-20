import React from 'react';

export default class extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @param {array} array
   * @param {function} callback
   */
  foreach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
}