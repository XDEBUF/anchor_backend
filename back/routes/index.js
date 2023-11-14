
const  Router = require('express');

const router = Router();

// import { initRoutesAuth } from './auth.js';
const routes = require("./feed.js");

// initRoutesAuth(router);
routes.initRoutesFeed(router);
