import express from 'express';
import UserController from '../../../app/Controllers/Api/v1/UserController';

import UserStoreRequest from '../../../app/Requests/Api/v1/User/UserStoreRequest';

const router = express.Router();

export default router
  .post('/request', UserStoreRequest, (req, res) => {
    res.end('hello');
  });
  // .get('/', UserController.index.bind(UserController))
  // .post('/', UserStoreRequest.validate.bind(UserStoreRequest), UserController.store.bind(UserController))
  // .put('/:user', UserController.update.bind(UserController))
  // .delete('/:user', UserController.destroy.bind(UserController));