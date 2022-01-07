const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'Geeta',
    email: 'manojkumarvaibhav@gmail.com',
    password: 'rkoanubhav',
    age: '45',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
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
    }).expect(200);
})

test('To check user login fail', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'jjkkllzz'
    }).expect(400);
});

test('To get profile of login user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect();
})

test('should reject profile of unauthorized user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
})