import { Router } from 'express';
import UserSessionsController from '../controllers/UserSessionsController';

const sessionsRouter = Router();

const userSessionsController = new UserSessionsController();

sessionsRouter.post('/', userSessionsController.store);

export default sessionsRouter;
