import { Router } from 'express';
import { AuthController } from '../auth/controller';
import { MakeExpressCallback } from '../helpers/make-express-callback';
import { requireAuth } from '../middleware/require-auth';

const router = Router();

router.get(
  '/currentUser',
  requireAuth,
  MakeExpressCallback(AuthController.currentUser)
);
router.post('/signup', MakeExpressCallback(AuthController.signup));
router.post('/signin', MakeExpressCallback(AuthController.signin));
router.post('/signout', MakeExpressCallback(AuthController.signout));

export { router as authRouter };
