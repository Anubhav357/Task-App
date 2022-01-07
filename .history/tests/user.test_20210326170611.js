const request = require('supertest');
const { getMaxListeners } = require('../src/index');
const app = require('../src/index');
const User = require('../src/models/user');

const userOne = {
    name: 'Geeta',
    email: 'manojkumarvaibhav@gmail.com',
    password: 'rkoanubhav',
    age: '45'
};

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Anubhav',
        email: 'rkoanubhav@gmail.com',
        password: 'uwx$123',
        age: '21'
    }).expect(201);
});

test('To check login correctly', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    });
})

test('To check user login fail', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'jjkkllzz'
    });
});