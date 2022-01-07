const request = require('supertest');
const { getMaxListeners } = require('../src/index');
const app = require('../src/index');
const User = require('../src/models/user');

const userOne = {
    email: 'manojkumarvaibhav@gmail.com',
    password: 'rkoanubhav'
};

beforeEach(() => {
    console.log('Before Each');
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Anubhav',
        email: 'rkoanubhav@gmail.com',
        password: 'uwx$123',
        age: '21'
    }).expect(201);
});