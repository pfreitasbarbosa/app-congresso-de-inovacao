# API Documentation

- [Login](#login)

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
