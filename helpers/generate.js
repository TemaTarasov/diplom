const fs = require('fs');
const crypto = require('crypto');

const server = require('../server/config/server.json');
const token = require('../server/config/token.json');


crypto.randomBytes(30, (err, buffer) => {
  token.salt = buffer.toString('hex');

  fs.writeFile(__dirname + '/../server/config/token.json', JSON.stringify(token, null, 2), err => {
    if (err) {
      return console.error(err);
    }

    return console.info(`Token Salt: ${token.salt}`);
  });
});

crypto.randomBytes(20, (err, buffer) => {
  server.session.secret = `base:64${buffer.toString('hex')}`;

  fs.writeFile(__dirname + '/../server/config/server.json', JSON.stringify(server, null, 2), err => {
    if (err) {
      return console.error(err);
    }

    return console.info(`Server Session Secret: ${server.session.secret}`);
  });
});
