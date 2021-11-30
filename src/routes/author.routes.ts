import { Router } from 'express';
import { AuthorController } from '../controllers/AuthorController';

const router = Router();

const controller = new AuthorController();

router.get('/:id', controller.findById);
router.get('/', controller.list);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router };
