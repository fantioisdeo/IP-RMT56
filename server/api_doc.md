# BallDash API Documentation

## Endpoints :

List of available endpoints:

- POST /login
- POST /register
- POST /login/google

## 1. POST /register

Description:

- Create a new account

Request:

- body:

```json
{
    "fullName": "string",
    "email": "string",
    "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string",
  "message": "Register Successful"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
    "message": "Email must be unique"
}
OR
{
    "message": "Invalid email format"
}
```

## 2. POST /login

Description:

- Login a user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /login/google

Description:

- Log in with Google account

Request:

- headers:

```json
{
  "clientToken": "<token>"
}
```
