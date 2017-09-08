import express from 'express';
import UserController from '../../../app/Controllers/UserController';

const router = express.Router();

export default router
  .get('/', UserController.index)
  .post('/store', UserController.store)
  .put('/:id', UserController.update)
  .delete('/:id', UserController.destroy);