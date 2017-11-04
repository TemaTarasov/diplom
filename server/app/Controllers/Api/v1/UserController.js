import Controller from './Controller';

import mongoose from 'mongoose';
import User from '../../../Models/User';

import hash from 'password-hash';

import jwt from 'jsonwebtoken';
import tokenConfig from '../../../../config/token.json';

import session from 'express-session';

export default new class extends Controller {
  /**
   * @param {object} req
   * @param {object} res
   */
  index(req, res) {
    User.all((err, users) => {
      if (err) {
        return res.json(err);
      }

      return res.json(users);
    });
  }

  /**
   * @param {object} body
   * @param {object} res
   */
  store({ body }, res) {
    const login = this.trim(body.login, true),
      email = this.trim(body.email, true),
      password = this.trim(body.password, true);

    User.new({
      login: login,
      email: email,
      password: hash.generate(password)
    }, (err, user) => {
      if (err) {
        return res.json({ err: err.code, msg: err.errmsg });
      }

      const setup = { id: user._id, login: user.login, email: user.email },
        token = jwt.sign(setup, tokenConfig.salt, { expiresIn: '1d' });

      session.auth = {
        auth: true,
        token: token,
        id: user._id,
        userName: user.login,
        email: user.email
      };

      return res.json({ token: token });
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  show(req, res) { }

  /**
   * @param {object} req
   * @param {object} res
   */
  update(req, res) { }

  /**
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) { }
}();
