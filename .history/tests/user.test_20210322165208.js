const request = require('supertest');

const app = require('../src/index');

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Anubhav',
        email: 'manojkumarvaibhav@gmail.com',
        password: 'mypasswordisgreat'
    }).expect(201);
});