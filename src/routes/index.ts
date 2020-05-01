import { Router } from 'express';
import usersRouter from './users.routes';
import sessionRouter from './session.routes';
import fileRouter from './file.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ server: 'online 🚀' }));
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/files', fileRouter);

export default routes;
