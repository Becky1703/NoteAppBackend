const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../index');
require("dotenv").config()

const port = process.env.PORT 


// const testPort = 4001;

describe('User Tests', () => {

   // const testPort = 4001;

    beforeAll(async () => {
      // await app.listen(testPort);
      // console.log(`Server running on port ${testPort}`)
      await mongoose.connect(process.env.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  });
    
    afterAll(async () => {
     // await new Promise((resolve) => server.close(resolve));
     // await app.close();
      await mongoose.connection.close();
    }); 

    beforeEach(() => {
        // Generate a unique email for each test
        uniqueEmail = `testuser_${Date.now()}@example.com`;
      }); 

    it('should return a welcome message for the home route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Api is working now');
    });

    it('should return a 404 status for an unknown route', async () => {
      const response = await request(app).get('/unknown-route');
      expect(response.status).toBe(404);
    });

    it('should create a new user', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({
          name: 'Jane',
          email: uniqueEmail,
          password: 'newpassword',
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', expect.stringContaining('User registered successfully'));
      expect(response.body).toHaveProperty('status', 1);
    }, 60000);

    it('should authenticate a user', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({
          email: "janedoe@example.com",
          password: 'newpassword',
        });

      console.log('Response:', response.body);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
}, 20000);
    
it('should handle invalid registration data', async () => {
  const response = await request(app)
    .post('/user/register')
    .send({
      // Invalid data, missing required fields
      name: 'Jane',
      password: 'XXXXXXXXXXX',
    });

  console.log('Response:', response.body);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('message', 'Invalid registration data');
});

it('should handle login with incorrect email', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'email@whatever.com',
      password: 'XXXXXX',
    });

    console.log('Response:', response.body);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty('message', 'User does not exist');
});
  

it('should handle login with incorrect password', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'janedoe@example.com',
      password: 'XXXXXXXXXXXXX',
    });

    console.log('Response:', response.body);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty('message', 'Incorrect password');
});

it('should handle login with incorrect email and password', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'wrongemail@example.com',
      password: 'XXXXXXXXXXXXX',
    });

    console.log('Response:', response.body);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty('message', 'User does not exist');
});

it('should handle login with incorrect credentials', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'janedoe@example.com',
      password: 'wrong',
    });

    console.log('Response:', response.body);
  expect(response.status).toBe(500);
  expect(response.body).toHaveProperty('message', 'Incorrect password');
});


});