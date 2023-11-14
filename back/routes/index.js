
const  Router =reuqire('express');

const router = Router();

// import { initRoutesAuth } from './auth.js';
 initRoutesFeed =require("./feed.js");

// initRoutesAuth(router);
initRoutesFeed(router);

export default router;