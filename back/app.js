import { join } from 'path';
import express from 'express';

import pkg from 'body-parser';
const { json } = pkg;
import pkg2 from 'mongoose';
const { mongoose } = pkg2;
import multer, { diskStorage } from 'multer';

import {feedRoutes} from './routes/feed.js';
import {connectToDb, getDb} from './middleware/connectDb.js';


const app = express();
const PORT = 3000;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, join('fichiers'));
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  }
});

/*const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};*/

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(json()); // application/json
app.use(
  multer({ storage: fileStorage}).single('fichier')
);
//app.use('/fichiers');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  next();
});

app.use('/feed', feedRoutes);
//app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log('This is the invalid field ->', error.field);
  res.status(status).json({ message: message, data: data });
});
let db;
connectToDb((err) => {
    if(!err){
       console.log('app is listening')
       db=getDb()
    }
})

