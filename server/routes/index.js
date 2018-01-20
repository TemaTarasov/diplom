import express from 'express';

import serverConfig from '../config/server.json';

const router = express.Router();

export default router
  .get('*', (req, res) => {
    res.render('index', { version: serverConfig.version });
  });
