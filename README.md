# login-server
A user signup/login server has been created, enabling users to register for an account. Upon signup, an email containing a verification link is sent to the provided email address. Clicking on this link verifies the email, granting access to the login functionality. However, login is only permitted after email verification has been completed.

## Project Design

- **Validation of input on the client side** 
- **Upon clicking signup, the backend verifies if the email already exists**
- **The backend sends a verification link to the registered email**
- **Attempting to login before email verification results in a notification stating "Email not verified**

### Getting Started

To get started with this project, follow these steps:

1. Fork this repository

1. Clone this repository to your local machine:

```bash
git clone https://github.com/ehteshamtarq/login-server.git
```

2. Install the required dependencies for the backend:

```bash
cd login-server/server
npm install
npm start
```

3. Configure the database connection in the backend. You can use MongoDB Atlas or a local MongoDB server.

4. Provide your AUTH_MAIL and AUTH_PASSWORD for sending mail 

5. Start the frontend server:

```bash
cd client
npm install
npm start
```


6. Access the application in your web browser at [http://localhost:5000](http://localhost:5000).

7. You can access Swagger UI docs at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Deployment
### Server is deployed at render and client is deployed at vercel
[Live](https://login-server-jfv6.vercel.app/)
