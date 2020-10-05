import { Request, Response } from 'express';
import SubscribeToEventService from '../services/SubscribeToEventService';
import UnsubscribeToEventService from '../services/UnsubscribeToEventService';

class EventSubscriptionController {
  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const parsedEventId = Number(id);

      const subscribeToEventService = new SubscribeToEventService();

      const { subscriptionId } = await subscribeToEventService.execute({
        userId: request.user.id,
        eventId: parsedEventId,
      });

      return response.status(201).json({ subscriptionId });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        throw new Error('Event id must be an integer number');
      }

      const unsubscribeToEventService = new UnsubscribeToEventService();

      await unsubscribeToEventService.execute({
        userId: request.user.id,
        eventId: parsedId,
      });

      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default EventSubscriptionController;
