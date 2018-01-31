import Controller from './Controller';

import hash from 'password-hash';

import User from '../../../Models/User';
import Auth from './AuthController';

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
    const {user} = session[tokenConfig.header];
    const {permissions} = user;

    User.create({
      login: body.login,
      email: body.email,
      password: hash.generate(body.password),
      permissions: (permissions === 'super' || permissions === 'admin')
        ? body.permissions || 'user'
        : 'user'
    }, (err, user) => {
        if (err) {
          res.json({
            code: err.code,
            index: err.index,
            errmsg: err.errmsg
          });
        } else {
          if (!user.id && !user.login) {
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
          } else {
            res.json({
              id: user._id,
              login: user.login,
              email: user.email,
              permissions: user.permissions
            });
          }
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
