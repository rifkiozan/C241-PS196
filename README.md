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
    - is_verified
    - verification_token
    ```
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE.
    verification_token VARCHAR(255)
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
    "message": "Anda berhasil register"
  }
  ```
  > You will receive an Email Verification on your Inbox or Spam
  
### Email Verification
- URL
  - /api/auth/verify-email/'Token'
  > Replace 'Token' with your Email Verification token
- Method
  - POST
- Response
  ```
  {
    "status": "success",
    "message": "Email verified successfully"
  }
  ```
  > If you Click the Link from the email this step will be done automaticly

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
    "message": "Anda berhasil login",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzE3MDg1MTU2LCJleHAiOjE3MTcwODg3NTZ9.K_Mp6nAaWhkaJ2DacRJTqf8YwZO2ljc2ciKHjd1G_bM"
  }
  ```
> Before you Login please make sure to Verify your Email

### Reset Password
- Request Reset Password
  - URL
    - /api/reset-password/request-reset-password
  - Method
    - POST
  - Request Body
    - email as string
  - Response
    ```
    {
      "status": "success",
      "message": "Reset password email sent"
    }
    ```
    > Reset Password Request Email will be sent to your Inbox or Spam

- Verify Reset Token
  - URL
    - /api/reset-password/verify-reset-token/'Token'
    > Replace 'Token' with your your Reset Password Token on your Email
  - Method
    - GET
  - Response
    ```
    {
      "status": "success",
      "message": "Password reset successfully. A new password has been sent to your email."
    }
    ```
    > 'Token' sent to the email still in JWT form not a Link (Will be an update)

### Authorization
- URL
  - api/protected
- Method
  - GET
- Headers
  - Key: Authorization
  - Value: Bearer 'Token'
  > Replace 'Token' with your login token
- Response
  ```
  {
    "msg": "You have access to this route",
    "userId": 3
  }
  ```
