import mongoose from 'mongoose';
import hash from 'password-hash';
import jwt from 'jsonwebtoken';
import session from 'express-session';

import Controller from './index';

import Auth from '../Middleware/Auth';
import User from '../Models/User';

import tokenConfig from '../../config/token.json';

class UserController extends Controller {
  constructor() {
    super();
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  index(req, res) {
    User.all((err, users) => {
      if (err) res.json(err);

      else res.json(users);
    });
  }

  /**
   * @param {Object} body
   * @param {Object} res
   */
  signUp({ body }, res) {
    const login = this.trim(body.login, true),
      email = this.trim(body.email, true),
      password = this.trim(body.password, true);

    if (this.validate([
      { value: login },
      { type: 'email', value: email },
      { value: password }
    ])) {
      User.new({
        login: login,
        email: email,
        password: hash.generate(password)
      }, (err, user) => {
        if (err) res.json({ err: err.code, msg: err.errmsg });

        else {
          const setup = { id: user._id, login: user.login, email: user.email },
            token = jwt.sign(setup, tokenConfig.salt, { expiresIn: '1d' });

          session.auth = {
            auth: true,
            token: token,
            id: user._id,
            userName: user.login
          };

          res.json({ token: token });
        }
      });
    } else {
      res.json({ err: 'validation error!' });
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  update(req, res) {
    const id = req.params.id,
      login = this.trim(req.body.login, true),
      email = this.trim(req.body.email, true),
      password = this.trim(req.body.password, true),
      update = {};

    if (this.validate([{ value: login }])) {
      session.auth.userName = login;

      update.login = login;
    }

    if (this.email(email)) {
      update.email = email;
    }

    if (this.validate([{ value: password }])) {
      update.password = hash.generate(password);
    }

    User.update(id, update, (err, user) => {
      res.status(200).end();
    });
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  signIn(req, res) {
    const login = this.trim(req.body.login, true),
      email = this.trim(req.body.email, true),
      password = this.trim(req.body.password, true);

    if (!this.validate([{ value: password }])) {
      res.json({ err: 'validation error!' });
    } else {
      if (this.validate([{ value: login }])) {
        Auth.attempt({ login: login, password: password }, user => {
          if (user.err) return res.json(user.err);

          res.json({
            token: user.token
          });
        });
      } else if (this.email(email)) {
        Auth.attempt({ email: email, password: password }, user => {
          if (user.err) return res.json(user.err);

          res.json({
            token: user.token
          });
        });
      } else {
        res.json({ err: 'validation error!' });
      }
    }
  }

  /**
   * @param {Object} req
   * @param {Object} res
   */
  signOut(req, res) {

  }

  /**
   * @param {Object} params
   * @param {Object} res
   */
  destroy({ params }, res) {
    User.destroy(params.id);

    res.status(200).end();
  }
}

export default new UserController();
