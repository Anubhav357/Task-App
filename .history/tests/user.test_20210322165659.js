const request = require('supertest');

const app = require('../src/index');

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Anubhav',
        email: 'rkoanubhav@gmail.com',
        password: 'uwx$123',
        age: '21'
    }).expect(201);
});