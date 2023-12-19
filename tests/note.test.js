/** write test for note route */
const request = require('supertest');
const { app, server } = require('../index'); // Import your Express app and server
const mongoose = require('mongoose');
// const { connection } = require('./index')
// const jwt = require('jsonwebtoken');
require("dotenv").config()


describe('Note Routes', () => {
    let authToken;

    beforeAll(async () => {


        await mongoose.connect(process.env.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Perform a mock login to get a valid JWT token for testing
        const response = await request(app)
            .post('/user/login')
            .send({
                email: 'janedoe@example.com',
                password: 'newpassword',
            });

        authToken = response.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await new Promise((resolve) => server.close(resolve));
    });

    it('should get all notes for a user', async () => {
        const response = await request(app)
            .get('/note')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', []);
        expect(response.body).toHaveProperty('message', 'All notes');
        expect(response.body).toHaveProperty('status', 1);
    });

    it('should handle errors when getting notes for a user', async () => {
        // Provide an invalid token to simulate unauthorized access
        const response = await request(app)
            .get('/note')
            .set('Authorization', 'Bearer invalid_token');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Unauthorized');
        expect(response.body).toHaveProperty('status', 0);
    });

    it('should handle errors when an exception occurs while getting notes', async () => {
        // Mock an error in the controller logic
        jest.spyOn(mongoose.Model, 'find').mockImplementationOnce(() => {
            throw new Error('Mocked error');
        });

        const response = await request(app)
            .get('/note')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Mocked error');
        expect(response.body).toHaveProperty('status', 0);
    });

    // Add more test cases for other note endpoints as needed
});





  
  