import express from 'express';
import UserController from '../app/Controllers/UserController';

const router = express.Router();

export default router
  .post('/sign-in', UserController.signIn.bind(UserController))
  .post('/sign-up', UserController.signUp.bind(UserController))
  .post('/sign-out', UserController.signOut.bind(UserController));