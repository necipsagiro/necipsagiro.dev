import cluster from 'cluster';
import dotenv from 'dotenv';
import express from 'express';
import favicon from 'serve-favicon';
import http from 'http';
import os from 'os';
import path from 'path';

import indexRouteController from './routes/indexRoute.js';

dotenv.config({ path: path.join(import.meta.dirname, '.env') });

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  const numCPUs = process.env.WEB_CONCURRENCY || os.cpus().length;

  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  const PORT = process.env.PORT || 3000;
  const URL = process.env.URL || `http://localhost:${PORT}`;

  app.set('views', path.join(import.meta.dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(express.static(path.join(import.meta.dirname, 'public')));
  app.use(favicon(path.join(import.meta.dirname, 'public/img/favicon/favicon.ico')));
  app.use((req, res, next) => {
    if (!req.query || typeof req.query != 'object')
      req.query = {};
    if (!req.body || typeof req.body != 'object')
      req.body = {};

    res.locals.url = URL;

    return next();
  });

  app.use('/', indexRouteController);

  server.listen(PORT, () => {
    console.log(`Server is on port ${PORT} as Worker ${cluster.worker.id} running @ process ${cluster.worker.process.pid}`);
  });
};
