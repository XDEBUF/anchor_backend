
import { Router } from 'express';

const router = Router();

// import { initRoutesAuth } from './auth.js';
import { initRoutesFeed } from "./feed.js";

// initRoutesAuth(router);
initRoutesFeed(router);

export default router;