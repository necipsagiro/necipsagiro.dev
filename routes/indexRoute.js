import express from 'express';

import indexGetController from '../controllers/index/get.js';

const router = express.Router();

router.get(
  '/',
    indexGetController
);

export default router;
