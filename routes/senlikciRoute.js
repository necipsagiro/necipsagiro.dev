import senlikciGetController from '../controllers/boun-senlikci/get.js';

async function router(app, options) {
  app.get(
    '/',
      senlikciGetController
  );
};

export default router;
