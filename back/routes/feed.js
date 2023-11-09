import { Router } from 'express';
//import { body } from 'express-validator/check';

import { toStoreFile, getPost, updatePost, deletePost } from '../controllers/feed.js';
//import {isAuth} from '../middleware/is-auth.js';

const router = Router();

// GET /feed/posts
//router.get('/posts', isAuth, feedController.getPosts);
export function feedRoutes(){
// POST /feed/post
router.post(
  '/post',
  //isAuth,
  /*[
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],*/
  toStoreFile()  
);

router.get('/post/:postId', getPost);

router.put(
  '/post/:postId',
  /*isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],*/
  updatePost
);

router.delete('/post/:postId', deletePost);
return router;
}
