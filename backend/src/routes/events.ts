import { Router } from 'express';
import ensureAuthenticationMiddleware from '../middlewares/ensureAuthentication';
import EventsController from '../controllers/EventsController';
import EventSubscriptionController from '../controllers/EventSubscriptionController';
import ConfirmPresenceService from '../services/ConfirmPresenceService';

const eventsController = new EventsController();
const eventSubscriptionController = new EventSubscriptionController();

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticationMiddleware);

eventsRouter.get('/', eventsController.index);
eventsRouter.get('/:id', eventsController.show);
eventsRouter.post('/subscribe/:id', eventSubscriptionController.store);
eventsRouter.post('/unsubscribe/:id', eventSubscriptionController.remove);
eventsRouter.post('/presence/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const parsedEventId = Number(id);
    if (Number.isNaN(parsedEventId)) {
      throw new Error('Event id must be an integer number');
    }

    const confirmPresenceService = new ConfirmPresenceService();

    const confirmedEvent = await confirmPresenceService.execute({
      eventId: parsedEventId,
      userId: request.user.id,
    });

    return response.status(201).json(confirmedEvent);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default eventsRouter;
