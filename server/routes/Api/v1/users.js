import express from 'express';
import UserController from '../../../app/Controllers/Api/v1/UserController';

import UserStoreRequest from '../../../app/Requests/Api/v1/User/UserStoreRequest';
import UserUpdateRequest from '../../../app/Requests/Api/v1/User/UserUpdateRequest';

const router = express.Router();

export default router
  .get('/', UserController.index.bind(UserController))
  .get('/:user', UserController.show.bind(UserController))
  .post('/', UserStoreRequest, UserController.store.bind(UserController))
  .put('/:user', UserUpdateRequest, UserController.update.bind(UserController))
  .patch('/:user', UserUpdateRequest, UserController.update.bind(UserController))
  .delete('/:user', UserController.destroy.bind(UserController));
