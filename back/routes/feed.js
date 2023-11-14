//import { body } from 'express-validator/check';

 feed = require('../controllers/feed.js');
//import {isAuth} from '../middleware/is-auth.js';

const  Router = require('express');

const router = Router();

// initRoutesAuth(router);
const initRoutesFeed = (router) =>
{
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
    feed.toStoreFile,
  );
  
 // router.get('/post/:postId', getPost);
  
  /*router.put(
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
    //updatePost
  //);
  
  router.delete('/post/:postId', deletePost);
}
module.exports = initRoutesFeed (router);
// GET /feed/posts
//router.get('/posts', isAuth, feedController.getPosts);

//export function feedRoutes(req, res, next){
// POST /feed/post

//return router;
//}