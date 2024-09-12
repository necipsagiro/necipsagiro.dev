import senlikciGetController from '../controllers/boun-senlikci/get.js';
import senlikciPostController from '../controllers/boun-senlikci/post.js';

async function router(app, options) {
  app.get(
    '/',
      senlikciGetController
  );

  app.post(
    '/',
      senlikciPostController
  );
};

export default router;
