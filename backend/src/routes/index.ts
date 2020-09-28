import { Router } from 'express';
import sessionsRouter from './sessions';
import eventsRouter from './events';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/events', eventsRouter);

export default routes;
