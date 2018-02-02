import Controller from './Controller';

import hash from 'password-hash';

import User from '../../../Models/User';
import Auth from './AuthController';

import tokenConfig from '../../../../config/token.json';
import session from 'express-session';

import mongoose from 'mongoose';

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
        res.json({
          code: err.code,
          index: err.index,
          errmsg: err.errmsg
        });
      } else {
        if (!sessionUser.id && !sessionUser.login) {
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
   * @param {object} params
   * @param {object} res
   */
  show({ params }, res) {
    const { user } = params;
    const id = mongoose.Types.ObjectId.isValid(user)
      ? user
      : mongoose.mongo.ObjectId("000000000000000000000000");

    User.findOne({
      $or: [
        { _id: id },
        { login: user }
      ]
    }, (err, user) => {
      if (err) {
        res.json(err);
      } else {
        res.json(user);
      }
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  update(req, res) {
    const sessionUser = session[tokenConfig.header].user;

    const { user } = req.params;
    const id = mongoose.Types.ObjectId.isValid(user)
      ? user
      : mongoose.mongo.ObjectId("000000000000000000000000");

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
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) {
  }
}();
