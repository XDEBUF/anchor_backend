import { unlink } from 'fs';
import { join } from 'path';

//import { validationResult } from 'express-validator/check';

import FilesCid from '../models/post.js';
//import { findById } from '../models/user.js';
import { toEncodeContentFile, toReadFile } from '../middleware/hash_utils.js';
import { storeToIpfs } from '../middleware/ipfs_utils.js';
export function posts(req, res, next) {
  const currentPage = req.query.count || 1;
  let totalItems;
  FilesCid.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      res.status(200).json({
        message: 'Fetched posts successfully.',
        posts: posts,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

export function toStoreFile(req, res, next) {
  console.log('in toStoreFile Controller')
  //const errors = validationResult(req);
 /*if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }*/
  if (!req.file || !req.file.path) {
    const error = new Error('No file provided.');
    error.statusCode = 422;
    throw error;
  }
  const fileuri = req.file.path;
  console.log(fileuri);
  const filehash = toEncodeContentFile(fileuri);
  console.log(filehash);
  const fileContent = toReadFile(fileuri);
  const cid = storeToIpfs(fileuri);
  console.log(cid);
  console.log('après stored');
  const filesCid = new FilesCid({
    filehash : filehash,
    fileContent : fileContent ,
    //cid : cid
   });
   console.log(filesCid.filehash,filesCid.cid);
   console.log('ici avant post')
   filesCid
    .save()
    .then(res => {res.status(200).json({
      message: 'file upload successfully!',
        filesCid: FilesCid,
     //   creator: { _id: creator._id, name: creator.name }
      })
})
    .catch(err => {
      if (!err.statusCode) {
        console.log('This is the invalid field ->', err.field)
        err.statusCode = 500;
      }
      next(err);
    });
}

export function getPost(req, res, next) {
  const postId = req.params.postId;
  FilesCid.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

export function updatePost(req, res, next) {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  FilesCid.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

export function deletePost(req, res, next) {
  const postId = req.params.postId;
  FilesCid.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      return findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

const clearImage = filePath => {
  filePath = join(__dirname, '..', filePath);
  unlink(filePath, err => console.log(err));
};
