import { Router } from 'express';
import ensureAuthenticationMiddleware from '../middlewares/ensureAuthentication';
import ListEventsService from '../services/ListEventsService';
import EventSubscriptionController from '../controllers/EventSubscriptionController';

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticationMiddleware);

const eventSubscriptionController = new EventSubscriptionController();

eventsRouter.get('/', async (request, response) => {
  const listEventsService = new ListEventsService();

  const events = await listEventsService.execute();

  return response.json(events);
});

eventsRouter.post('/subscribe/:id', eventSubscriptionController.store);

eventsRouter.post('/unsubscribe/:id', eventSubscriptionController.remove);

export default eventsRouter;
