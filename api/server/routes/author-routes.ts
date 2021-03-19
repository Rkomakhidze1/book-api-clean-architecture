import { Router } from 'express';
import { AuthorController } from '../author/controller';
import { MakeExpressCallback } from '../helpers/make-express-callback';
import { validateRequest } from '../middleware/validate-request';
import { authorValidation } from '../validations/author';

const router = Router();

router.get('/', MakeExpressCallback(AuthorController.getAuthors));
router.get('/:id', MakeExpressCallback(AuthorController.getAuthor));
router.post(
  '/',
  authorValidation,
  validateRequest,
  MakeExpressCallback(AuthorController.postAuthor)
);
router.patch(
  '/:id',
  authorValidation,
  validateRequest,
  MakeExpressCallback(AuthorController.patchAuthor)
);
router.delete('/:id', MakeExpressCallback(AuthorController.deleteAuthor));

export { router as authorRouter };
