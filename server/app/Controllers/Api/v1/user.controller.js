import Controller from './controller';

import hash from 'password-hash';

import User from '../../../Models/user.model';
import Auth from './auth.controller';

import tokenConfig from '../../../../config/token.json';
import session from 'express-session';

import { isObjectId } from '../../../../utils/string.utils';

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
    const sessionUser = session[tokenConfig.header].user;
    const sessionPermissions = sessionUser.permissions;

    User.create({
      login: body.login,
      email: body.email,
      password: hash.generate(body.password),
      permissions: (sessionPermissions === 'super' || sessionPermissions === 'admin')
        ? body.permissions || 'user'
        : 'user'
    }, (err, user) => {
      if (err) {
        return res.json({
          code: err.code,
          index: err.index,
          errmsg: err.errmsg
        });
      }

      if (!sessionUser.id && !sessionUser.login) {
        return Auth.attempt({
          login: user.login,
          password: body.password
        }, (err, authUser) => {
          if (err) {
            return res.json(err);
          }

          return res.json(authUser);
        });
      }

      return res.json({
        id: user._id,
        login: user.login,
        email: user.email,
        permissions: user.permissions
      });
    });
  }

  /**
   * @param {object} params
   * @param {object} res
   */
  show({ params }, res) {
    const { user } = params;
    const id = isObjectId(user);

    User.findOne({
      $or: [
        { _id: id },
        { login: user }
      ]
    }, (err, user) => {
      if (err) {
        return res.json(err);
      }

      return res.json(user);
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  update(req, res) {
    const sessionUser = session[tokenConfig.header].user;

    const { user } = req.params;
    const id = isObjectId(user);

    const updateData = Object.keys(req.body).reduce((acc, key) => {
      const item = req.body[key];

      if (item && item !== '') {
        acc[key] = key === 'password'
          ? hash.generate(item)
          : item;

        return acc;
      }

      return acc;
    }, {});

    User.update({
      $or: [
        { _id: id },
        { login: user }
      ]
    }, updateData, (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.json(data);
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) {
  }
}();
