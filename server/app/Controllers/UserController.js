import mongoose from 'mongoose';
import Controller from './index';

import hash from 'password-hash';

import User from '../Models/User';

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
  store({ body }, res) {
    const login = this.trim(body.login, true);
    const email = this.trim(body.email, true);
    const password = this.trim(body.password, true);

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

        // TODO: jwt auth, and session start.
        else res.json(user);
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
          object = {
            login: this.validate([{ value: login }]) ? login: null,
            email: this.email(email) ? email: null,
            password: this.validate([{ value: password }]) ? hash.generate(password): null
          };

    const update = Object.keys(object).reduce((acc, key) => {
      if (object[key]) acc[key] = object[key];

      return acc;
    }, {});

    User.update(id, update, (err, user) => {
      res.json({
        err: { err },
        user: { user }
      });
    });
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
