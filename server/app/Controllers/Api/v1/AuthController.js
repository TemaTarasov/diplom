import jwt from 'jsonwebtoken';
import tokenConfig from '../../../../config/token.json';

import hash from 'password-hash';
import session from 'express-session';

import User from '../../../Models/User';

export default class {
  static attempt(data, callback) {
    const trim = value => {
      if (value) {
        return value.trim().split(' ').filter(x => x !== '').join('');
      }

      return '';
    };
    const {login, email, password} = data;

    switch (true) {
      case trim(email) !== '':
        User.find({email: email}, (err, user) => {
          if (err) return callback(err);

          if (hash.verify(password, user.password)) {
            const token = jwt.sign({id: user._id, login: user.login}, tokenConfig.salt, {expiresIn: '1d'});
            const authUser = {
              user: {
                id: user._id,
                login: user.login
              },
              token: token
            };

            session[tokenConfig.header] = authUser;

            return callback(null, authUser);
          }

          return callback({
            message: 'wrong email or password'
          });
        });
        break;
      case trim(login) !== '':
        User.find({login: login}, (err, user) => {
          if (err) return callback(err);

          if (hash.verify(password, user.password)) {
            const token = jwt.sign({id: user._id, login: user.login}, tokenConfig.salt, {expiresIn: '1d'});
            const authUser = {
              user: {
                id: user._id,
                login: user.login
              },
              token: token
            };

            session[tokenConfig.header] = authUser;

            return callback(null, authUser);
          }

          return callback({
            message: 'wrong login or password'
          });
        });
        break;
      default:
        return callback({
          message: 'empty login or email'
        });
        break;
    }
  }
}
