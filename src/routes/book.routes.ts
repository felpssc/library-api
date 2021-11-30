import { Router } from 'express';
import { BookController } from '../controllers/BookController';

const router = Router();

const controller = new BookController();

router.post('/', controller.create);
router.get('/:id', controller.findById);
router.get('/author/:author_id', controller.listAuthorBooks);

export { router };
