import mongoose from 'mongoose';
import Controller from './index';

import User from '../Models/User';

class UserController extends Controller {
  /**
   * @param {any} req
   * @param {any} res
   */
  index(req, res) {
    console.log('index');
  }

  /**
   * @param {any} req
   * @param {any} res
   */
  store(req, res) {
    console.log('store');
  }

  /**
   * @param {any} req
   * @param {any} res
   */
  update(req, res) {
    console.log('update');
  }

  /**
   * @param {any} req
   * @param {any} res
   */
  destroy(req, res) {
    console.log('destroy');
  }
}

export default new UserController();