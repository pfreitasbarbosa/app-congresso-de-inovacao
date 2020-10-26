import { Router } from 'express';
import ensureAuthenticationMiddleware from '../middlewares/ensureAuthentication';
import EventsController from '../controllers/EventsController';
import EventSubscriptionController from '../controllers/EventSubscriptionController';
import EventPresenceController from '../controllers/EventPresenceController';

const eventsController = new EventsController();
const eventSubscriptionController = new EventSubscriptionController();
const eventPresenceController = new EventPresenceController();

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticationMiddleware);

eventsRouter.get('/', eventsController.index);
eventsRouter.get('/:id', eventsController.show);
eventsRouter.post('/subscribe/:id', eventSubscriptionController.store);
eventsRouter.post('/unsubscribe/:id', eventSubscriptionController.remove);
eventsRouter.post('/presence/:id', eventPresenceController.store);

export default eventsRouter;
