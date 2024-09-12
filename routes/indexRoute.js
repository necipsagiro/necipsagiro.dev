import indexGetController from '../controllers/index/get.js'

async function router(app, options) {
  app.get(
    '/',
      indexGetController
  );
};

export default router;
