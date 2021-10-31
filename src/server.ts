import express from 'express';

import './database';

import { router } from './routes/server.routes';
import { router as authorRouter } from './routes/author.routes';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.redirect('/api');
});

app.use('/api', router);
app.use('/api/author', authorRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('🔥 Server started on port 3000');
});
