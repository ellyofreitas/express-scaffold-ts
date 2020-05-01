import { Router } from 'express';
import { AuthenticateUserService, FindByIdUserService } from '../services';
import { ensureAuthentication } from '../middlewares';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { token, user } = await authenticateUser.execute({ email, password });

  delete user.password_hash;

  return res.status(200).json({ user, token });
});

sessionRouter.use(ensureAuthentication);

sessionRouter.get('/me', async (req, res) => {
  const findByIdUser = new FindByIdUserService();

  const user = await findByIdUser.execute(req.user.id);

  return res.status(200).json(user);
});

export default sessionRouter;
