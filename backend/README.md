# API Documentation

- [Login](#login)
- [Event listing](#event-listing)

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
    ]
  }
]
```

### Failed Response (`401 Unauthorized`):

```json
{
  "error": "Invalid token"
}
```
