import cluster from 'cluster';
import dotenv from 'dotenv';
import fastify from 'fastify';
import path from 'path';
import pug from 'pug';
import os from 'os';
import MongoDBStore from 'connect-mongodb-session';
import mongoose from 'mongoose';

import fastifyCookie from '@fastify/cookie';
import fastifyFormBody from '@fastify/formbody';
// import fastifyMongoDB from '@fastify/mongodb';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';

import indexRouteController from './routes/indexRoute.js';
import senlikciRouteController from './routes/senlikciRoute.js';

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
  const app = fastify();

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/necipsagiro-dev';
  const PORT = process.env.PORT || 3000;
  const URL = process.env.URL || `http://localhost:${PORT}`;

  mongoose.connect(MONGODB_URI);

  app.register(fastifyFormBody);
  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60
    }
  });
  app.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
    store: new MongoDBStore(fastifySession)({
      uri: MONGODB_URI,
      collection: 'sessions'
    })
  });
  app.register(fastifyStatic, {
    root: path.join(import.meta.dirname, 'public'),
    prefix: '/static'
  });
  app.register(fastifyStatic, {
    root: path.join(import.meta.dirname, 'public/img/favicon'),
    prefix: '/',
    decorateReply: false
  });
  app.register(fastifyView, {
    engine: {
      pug: pug
    },
    root: path.join(import.meta.dirname, 'views'),
    viewExt: 'pug',
    propertyName: 'render'
  });

  app.register(indexRouteController, { prefix: '/' });
  app.register(senlikciRouteController, { prefix: '/boun-senlikci' });

  app.listen({ port: PORT }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    };

    console.log(`Server is on port ${PORT} as Worker ${cluster.worker.id} running @ process ${cluster.worker.process.pid}`);
  });
};
