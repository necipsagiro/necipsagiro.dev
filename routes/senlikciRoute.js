import express from 'express';

import senlikciGetController from '../controllers/boun-senlikci/get.js';

const router = express.Router();

router.get(
  '/',
    senlikciGetController
);

export default router;
