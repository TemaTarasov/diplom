import Controller from './Controller';

import hash from 'password-hash';

import User from '../../../Models/User';
import Auth from './AuthController';

export default new class extends Controller {
  /**
   * @param {object} req
   * @param {object} res
   */
  index(req, res) {
    User.all((err, users) => {
      if (err) {
        res.json(err);
      } else {
        res.json(users);
      }
    });
  }

  /**
   * @param {object} body
   * @param {object} res
   */
  store({body}, res) {
    User.create({
      login: body.login,
      email: body.email,
      password: hash.generate(body.password)
    }, (err, user) => {
      if (err) {
        res.json({
          code: err.code,
          index: err.index,
          errmsg: err.errmsg
        });
      } else {
        Auth.attempt({
          login: user.login,
          password: body.password
        }, (err, authUser) => {
          if (err) {
            res.json(err);
          } else {
            res.json(authUser);
          }
        });
      }
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  show(req, res) {
  }

  /**
   * @param {object} body
   * @param {object} res
   */
  update({body}, res) {
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) {
  }
}();
