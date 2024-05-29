# C241-PS196
C241-PS196 Capstone Project

### Endpoint
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
  - password as string, must be at least 8 characters
- Response
  ```
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE2OTg3MDQ4LCJleHAiOjE3MTY5OTA2NDh9.TE_ham55MmobQFiNDGklJZQFF6Se9wqnPtqcfCM5bEg"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE2OTg3MDQ4LCJleHAiOjE3MTY5OTA2NDh9.TE_ham55MmobQFiNDGklJZQFF6Se9wqnPtqcfCM5bEg"
  }
  ```
