import express from 'express';

import wgGetController from '../controllers/index/get.js';

const router = express.Router();

router.get(
  '/',
    wgGetController
);

export default router;
