import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

const controller = new CategoryController();

router.get('/', controller.list);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router };
