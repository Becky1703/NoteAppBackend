/** write tests for note route */

const request = require('supertest');
const { app } = require('../index'); // Import your Express app and server
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../db');

describe('Note Routes', () => {
 let authToken;

  beforeAll(async () => {
    await connectDB();   
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'janedoe@example.com',
        password: 'newpassword',
      });
      
      console.log(response.body);
      

      authToken = response.body.data.token;

    });


  it('should get all notes for a user', async () => {
    const response = await request(app)
     .get('/note')
     .set('Authorization', `Bearer ${authToken}`);

    console.log(response.body);  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message', 'All notes');
    expect(response.body).toHaveProperty('status', 1);
  }, 6000);

  it('should handle errors when getting notes for a user', async () => {
    // Provide an invalid token to simulate unauthorized access
    const response = await request(app)
      .get('/note')
      .set('Authorization', 'Bearer invalid_token');

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    expect(response.body).toHaveProperty('status', 0);
  }, 6000);

  it('should handle errors when an exception occurs while getting notes', async () => {
    // Mock an error in the controller logic
    jest.spyOn(mongoose.Model, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const response = await request(app)
      .get('/note')
      .set('Authorization', `Bearer ${authToken}`);
    
    console.log(response.body);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
    expect(response.body).toHaveProperty('status', 0);
  }, 6000);

  // Add more test cases for other note endpoints as needed
});

