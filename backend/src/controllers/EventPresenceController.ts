import { Request, Response } from 'express';
import ConfirmPresenceService from '../services/ConfirmPresenceService';

class EventPresence {
  public async store(request: Request, response: Response): Promise<Response> {
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
  }
}

export default EventPresence;
