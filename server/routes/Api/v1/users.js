import express from 'express';
import UserController from '../../../app/Controllers/UserController';

const router = express.Router();

export default router
  .get('/', UserController.index.bind(UserController))
  .post('/store', UserController.store.bind(UserController))
  .put('/:id', UserController.update.bind(UserController))
  .delete('/:id', UserController.destroy.bind(UserController));