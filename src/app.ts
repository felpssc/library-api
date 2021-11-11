import express from 'express';

import { router } from './routes/server.routes';
import { router as authorRouter } from './routes/author.routes';

import createConnection from './database/index';

(async () => {
  try {
    await createConnection();
    console.log('🔌 Connected to database');
  } catch (error) {
    console.log(error);
  }
})();

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.redirect('/api');
});

app.use('/api', router);
app.use('/api/author', authorRouter);

export { app };
