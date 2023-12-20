/** write test for note route */
const request = require('supertest');
const { app, server } = require('../index'); // Import your Express app and server
const mongoose = require('mongoose');
// const { connection } = require('./index')
const jwt = require('jsonwebtoken');
require("dotenv").config()
const nock = require('nock');
const { NoteModel } = require('../models/NoteModel');

describe('Note Routes', () => {
    let authToken;
    
    beforeAll(async () => {
       
   // nock('http://localhost:4000')
    //  .post('/login')
   //   .reply(200, { token: 'mocked-jwt-token' });

    // Perform a mock login to get the token
    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: 'Becky1703@gmail.com',
        password: '456789',
      });

    authToken = loginResponse.body.token;

    // Mock other external services as needed for testing
    // ...

    // Create a note for testing
    // This assumes your Note model has a reference to a user (user field)
    await NoteModel.create({
      title: 'Test Note',
      body: 'This is a test note..',
      user: '65805a851db49080c3c20d5e', // Use a valid user ID from your database
    });
  });


    afterAll(async () => {
        await NoteModel.deleteMany({ title: 'Test Note' });
        await mongoose.connection.close();
        await new Promise((resolve) => server.close(resolve));
    });

    // const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

    it('should handle errors when getting notes for a user', async () => {
        // Provide an invalid token to simulate unauthorized access
        const response = await request(app)
            .get('/note')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidpayload.signature');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Token is not valid, please login.');
        expect(response.body).toHaveProperty('status', 2);
    });

    it('should handle errors when an exception occurs while getting notes', async () => {
        // Mock an error in the controller logic
        jest.spyOn(mongoose.Model, 'find').mockImplementationOnce(() => {
            throw new Error('Mocked error');
        });

        const response = await request(app)
            .get('/note')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Token is not valid, please login.');
        expect(response.body).toHaveProperty('status', 2);
    });


});



  
  