import { Request, Response } from 'express';
import ListEventsService from '../services/ListEventsService';

class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listEventsService = new ListEventsService();

      const events = await listEventsService.execute({
        userId: request.user.id,
      });

      return response.json(events);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const parsedId = Number(id);

      const listEventsService = new ListEventsService();

      const [event] = await listEventsService.execute({
        id: parsedId,
        userId: request.user.id,
      });

      return response.json(event);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default EventsController;
