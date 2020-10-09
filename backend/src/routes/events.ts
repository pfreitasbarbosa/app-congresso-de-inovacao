import { Router } from 'express';
import ensureAuthenticationMiddleware from '../middlewares/ensureAuthentication';
import EventsController from '../controllers/EventsController';

const eventsController = new EventsController();

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticationMiddleware);

eventsRouter.get('/', eventsController.index);
eventsRouter.get('/:id', eventsController.show);

export default eventsRouter;
