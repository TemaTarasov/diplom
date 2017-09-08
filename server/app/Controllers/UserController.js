import mongoose from 'mongoose';
import Controller from './index';

import User from '../Models/User';

class UserController extends Controller {
  constructor() {
    super();
  }

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
    const { login, email, password } = req.body;

    if (this.validate([
      { value: login },
      { type: 'email', value: email },
      { value: password }
    ])) {
      User.new({
        login: login,
        email: email,
        password: password
      }, (err, user) => {
        if (err) return res.json({ err: err.code, msg: err.errmsg });

        return res.json(user);
      });
    } else {
      return res.end();
    }
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
