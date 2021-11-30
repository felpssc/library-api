import express from 'express';

import { router } from './routes/server.routes';
import { router as authorRouter } from './routes/author.routes';
import { router as categoryRouter } from './routes/category.routes';
import { router as bookRouter } from './routes/book.routes';

import createConnection from './database/index';

(async () => {
  try {
    await createConnection();
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
app.use('/api/category', categoryRouter);
app.use('/api/book', bookRouter);

export { app };
