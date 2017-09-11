import mongoose from 'mongoose';
import hash from 'password-hash';
import jwt from 'jsonwebtoken';
import session from 'express-session';

import User from '../Models/User';

import tokenConfig from '../../config/token.json';

class Auth {
  /**
   * @param {Object} { login, email, password }
   * @param {Function} callback
   */
  attempt({ login, email, password }, callback = () => {}) {
    if (login) {
      User.find({
        login: login
      }, (err, user) => {
        if (err) {
          callback({ err: err });
        } else if (user) {
          const setup = { id: user._id, login: user.login, email: user.email },
                token = jwt.sign(setup, tokenConfig.salt,  { expiresIn: '1d' });

          if (hash.verify(password, user.password)) {
            session.auth = {
              ...session.auth,
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
          const setup = { id: user._id, login: user.login, email: user.email },
                token = jwt.sign(setup, tokenConfig.salt,  { expiresIn: '1d' });

          if (hash.verify(password, user.password)) {
            callback({ token: token });
          } else {
            callback({ err: 'Access Denied' });
          }
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
