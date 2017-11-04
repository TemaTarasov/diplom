import mongoose from 'mongoose';
import hash from 'password-hash';
import jwt from 'jsonwebtoken';
import session from 'express-session';

import User from '../Models/User';

import tokenConfig from '../../config/token.json';

class Auth {
  /**
   * @param {object} user
   * @param {function} callback
   */
  token(user, callback) {
    const setup = { id: user._id, login: user.login, email: user.email },
      token = jwt.sign(setup, tokenConfig.salt, { expiresIn: '1d' });

    if (hash.verify(password, user.password)) {
      session.auth = {
        auth: true,
        token: token,
        id: user._id,
        userName: user.login
      };

      callback({
        ...user,
        token: token
      });
    } else {
      callback({ err: 'Access Denied' });
    }
  }

  /**
   * @param {object} { login, email, password }
   * @param {function} callback
   */
  attempt({ login, email, password }, callback = () => { }) {
    if (login) {
      User.find({
        login: login
      }, (err, user) => {
        if (err) {
          callback({ err: err });
        } else if (user) {
          this.token(user, callback);
        } else {
          callback({ err: 'Access Denied' });
        }
      });
    } else if (email) {
      User.find({
        email: email
      }, (err, user) => {
        if (err) {
          callback({ err: err });
        } else if (user) {
          this.token(user, callback);
        } else {
          callback({ err: 'Access Denied' });
        }
      });
    } else {
      callback({ err: 'User is not found' });
    }
  }
}

export default new Auth();
