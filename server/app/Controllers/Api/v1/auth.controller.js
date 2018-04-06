import jwt from 'jsonwebtoken';
import tokenConfig from '../../../../config/token.json';

import hash from 'password-hash';
import session from 'express-session';

import User from '../../../Models/user.model';

import { trim } from '../../../../utils/string.utils';

export default class {
  static attempt({ login, email, password }, callback) {
    User.findOne({
      $or: [
        { login: trim(login) },
        { email: trim(email) }
      ]
    }, (err, user) => {
      if (err) return callback(err);

      if (hash.verify(password, user.password)) {
        const authUser = {
          user: {
            id: user._id,
            login: user.login,
            permissions: user.permissions
          },
          token: jwt.sign({ id: user._id, login: user.login }, tokenConfig.salt, { expiresIn: '1d' })
        };

        session[tokenConfig.header] = authUser;

        return callback(null, authUser);
      } else {
        callback({
          message: 'Wrong Credentials'
        });
      }
    });
  }
}
