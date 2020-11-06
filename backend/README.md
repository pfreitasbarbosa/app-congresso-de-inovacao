# API Documentation

- [Login](#login)
- [Event listing](#event-listing)
- [Specific event listing](#specific-event-listing)
- [Event subscription](#event-subscription)
- [Event unsubscription](#event-unsubscription)
- [Event presence confirmation](#event-presence-confirmation)

## Login

**HTTP method:** `POST`

**Endpoint:** `/sessions`

**Description:** Endpoint used to login an user into the application. Accepts `username` and `password` and returns the user information alongside a JWT (expires in 3 days).

### Request:

```json
{
  "username": "johndoe",
  "password": "passtest"
}
```

### Successful Response (`200 OK`):

```json
{
  "user": {
    "id": 215,
    "name": "John Doe",
    "email": "johndoe@email.com",
    "username": "johndoe"
  },
  "token": "eyJhfGciOiJIUzI1KiIsIhueCI6IkpXVCJ1.eyJpYKUiOjE2NDAwMzQyMTUsIxV4cCI6MTYwMDI5MzQxNSwbr2ViIjoiMzUifQ.30_J1xbClnCPUGqpd_LkS-HKqmhuePrIInT30mWqNVA"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Incorrect email/password combination"
}
```

## Event listing

**HTTP method:** `GET`

**Endpoint:** `/events`

**Description:** Endpoint used to list all registered events. The user must provide the authentication token to access the endpoint, no request body is necessary.

### Successful Response (`200 OK`):

```json
[
  {
    "id": 1,
    "type": "Palestra",
    "name": "Visões de Futuro – Nossa Vida Pessoal com IA",
    "description": null,
    "start_time": "2020-11-16T17:00:00.000Z",
    "location": "Auditório Principal - Prédio A",
    "end_time": "2020-11-16T17:20:00.000Z",
    "speakers": [
      {
        "name": "Fulano da Silva",
        "email": "fulano@fei.edu.br",
        "linkedin_url": "https://www.linkedin.com/in/fulano/",
        "lattes_url": "http://lattes.cnpq.br/24642367243562"
      }
    ],
    "categories": [
      "Ciência da Computação",
      "Administração",
      "Engenharia Elétrica"
    ],
    "subscribed": false,
    "confirmed": false
  }
]
```

### Failed Response (`401 Unauthorized`):

```json
{
  "error": "Invalid token"
}
```

## Specific event listing

**HTTP method:** `GET`

**Endpoint:** `/events/:id`

**Description:** Endpoint used to list a specific registered event, the event id must be provided through route params. The user must provide the authentication token to access the endpoint, no request body is necessary.

The possible responses to the endpoint `/events/1` is shown below. Will return an error if provided an invalid event id.

### Successful Response (`200 OK`):

```json
{
  "id": 1,
  "type": "Palestra",
  "name": "Visões de Futuro – Nossa Vida Pessoal com IA",
  "description": null,
  "start_time": "2020-10-16T17:00:00.000Z",
  "location": "Auditório Principal - Prédio A",
  "speakers": [
    {
      "name": "Fulano da Silva",
      "email": "fulano@fei.edu.br",
      "linkedin_url": "https://www.linkedin.com/in/fulano/",
      "lattes_url": "http://lattes.cnpq.br/24642367243562"
    }
  ],
  "categories": [
    "Ciência da Computação",
    "Administração",
    "Engenharia Elétrica"
  ],
  "subscribed": false,
  "confirmed": false
}
```

### Failed Response (`401 Unauthorized`):

```json
{
  "error": "Invalid token"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "No event was found"
}
```

## Event subscription

**HTTP method:** `POST`

**Endpoint:** `/events/subscribe/:id`

**Description:** Endpoint used to subscribe to an event, the user must provide the authentication token to access this route and the event id (integer) must be provided through route parameters.

Will result an error if the user try to subscribe into: an event that the user already subscribed for, an event that already ended, an event at the same time of another that the user is subscribed for or a non existing event.

### Successful Response (`201 Created`):

```json
{
  "subscriptionId": 23
}
```

### Failed Response (`401 Unauthorized`):

```json
{
  "error": "Invalid token"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "User already subscribed to that event"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Can't subscribe to a past event"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "User already subscribed to an event in that hour"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "There is no event with provided id"
}
```

## Event unsubscription

**HTTP method:** `POST`

**Endpoint:** `/events/unsubscribe/:id`

**Description:** Endpoint used to unsubscribe to an event, the user must provide the authentication token to access this route and the event id (integer) must be provided through route parameters.

Will result an error if the user try to unsubscribe into: an event that the user did not subscribe for, an event that already ended, a non existing event or if presence was already confirmed. In case of success, there is no response body.

### Successful Response (`200 OK`):

```json

```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Can't unsubscribe to an event you haven't subscribed to"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Can't unsubscribe to a past event"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "There is no event with provided id"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Can't unsubscribe if presence was confirmed"
}
```

## Event presence confirmation

**HTTP method:** `POST`

**Endpoint:** `/events/presence/:id`

**Description:** Endpoint used to confirm presence to an event, the user must provide the authentication token to access this route and the event id (integer) must be provided through route parameters.

Will result an error if the user try to confirm presence into: an event that the user did not subscribe for, an event that the presence is already confirmed, an ongoing/past event, an event that does not accepts confirmations (can only confirm presence 30 minutes before the event starts) or a non existing event. In case of success, there is no response body.

### Successful Response (`201 Created`):

```json
{
  "id": 5,
  "event_id": 1,
  "user_id": 1,
  "event_start": "2021-11-16T17:00:00.000Z",
  "event_end": "2021-11-16T17:20:00.000Z",
  "confirmed": true
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "User is not subscribed to this event"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "User's presence was already confirmed"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Can't confirm presence in an ongoing or past event"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "Presence confirmation is only available 30 minutes before the event start"
}
```

### Failed Response (`400 Bad Request`):

```json
{
  "error": "There is no event with provided id"
}
```
