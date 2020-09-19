import { Router } from 'express';
import ensureAuthenticationMiddleware from '../middlewares/ensureAuthentication';
import ListEventsService from '../services/ListEventsService';

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticationMiddleware);

eventsRouter.get('/', async (request, response) => {
  const listEventsService = new ListEventsService();

  const events = await listEventsService.execute();

  return response.json(events);
});

export default eventsRouter;
