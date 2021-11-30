import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    info: '📚️ Library - API',
    status: 'online',
    creator: 'https://github.com/felpssc',
  });
});

export { router };
