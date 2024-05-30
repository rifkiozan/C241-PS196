# C241-PS196
C241-PS196 Capstone Project

## Database
- Name
  - testdb
- Table
  - users
    - id
    - name
    - email
    - password
    ```
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );
    ```

## Endpoint
Base URL:
> Not deployed

### Register
- URL
  - api/auth/register
- Method
  - POST
- Request Body
  - name as string
  - email as string, must be unique
  - password as string
- Response
  ```
  {
    "status": "success",
    "message": "Anda berhasil register",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzE3MDg1MTM2LCJleHAiOjE3MTcwODg3MzZ9.IaLYt65PgMOVxsGAz_tejVDSQRNeor4RmhAh6LsrIAw"
  }
  ```

### Login
- URL
  - api/auth/login
- Method
  - POST
- Request Body
  - email as string
  - password as string
- Response
  ```
  {
    "status": "success",
    "message": "Anda berhasil register",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzE3MDg1MTM2LCJleHAiOjE3MTcwODg3MzZ9.IaLYt65PgMOVxsGAz_tejVDSQRNeor4RmhAh6LsrIAw"
  }
  ```

### Authorization
- URL
  - api/protected
- Method
  - GET
- Headers
  - Key: Authorization
  - Value: Bearer <Token>
  > Replace <Token> with your login token
- Response
  ```
  {
    "msg": "You have access to this route",
    "userId": 3
  }
  ```
