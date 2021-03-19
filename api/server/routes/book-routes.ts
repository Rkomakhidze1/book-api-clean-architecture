import { Router } from 'express';
import { BookController } from '../book/controller';
import { MakeExpressCallback } from '../helpers/make-express-callback';
import { validateRequest } from '../middleware/validate-request';
import { bookValidation } from '../validations/book';

const router = Router();

router.get('/', MakeExpressCallback(BookController.getBooks));
router.get('/:id', MakeExpressCallback(BookController.getBook));
router.post(
  '/',
  bookValidation,
  validateRequest,
  MakeExpressCallback(BookController.postBook)
);
router.patch(
  '/:id',
  bookValidation,
  validateRequest,
  MakeExpressCallback(BookController.patchBook)
);
router.delete('/:id', MakeExpressCallback(BookController.deleteBook));

export { router as bookRouter };
