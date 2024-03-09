const request = require('supertest');
const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const authenticationController = require('../controllers/Authentication.js');
const authenticationRoutes = require('../routes/Authentication.js');
const pool = require('../database/pool.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(passport.initialize());
app.use(session({
    secret: 'i-like-butterchicken',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
        //eq. 1 day
    }
}));
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}));
app.use('/auth', authenticationRoutes);

describe('Authentication routes', () => {
  
    afterAll(async () => {
        await pool.end();
    });
    
    test('POST /auth/login - valid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'daniel@email.com', password: 'butter' });
        expect(authenticationController.login);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Logged in');
    });

    test('POST /auth/login - invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ username: 'daniel@email.com', password: 'wrongpassword' });
        expect(authenticationController.login);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Incorrect password.');
    });

    test('POST /auth/logout', async () => {
        const agent = request.agent(app);
        await agent.post('/auth/login');
        const response = await agent.post('/auth/logout');
        expect(authenticationController.logout);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Logged out');
    });

    test('POST /auth/checkSession - authenticated', async () => {
        const agent = request.agent(app);
        await agent.post('/auth/login').send({ username: 'daniel@email.com', password: 'butter' });
        const response = await agent.post('/auth/checkSession');
        expect(authenticationController.checkAuthenticated);
        expect(response.status).toBe(200);
        expect(response.body.isAuthenticated).toBe(true);
    });

    test('POST /auth/checkSession - not authenticated', async () => {
        const response = await request(app).post('/auth/checkSession');
        expect(authenticationController.checkAuthenticated);
        expect(response.status).toBe(200);
        expect(response.body.isAuthenticated).toBe(false);
    });

    test('POST /auth/getUserEmail - authenticated', async () => {
        const agent = request.agent(app);
        await agent.post('/auth/login').send({ username: 'daniel@email.com', password: 'butter' });
        const response = await agent.post('/auth/getUserEmail');
        expect(authenticationController.getEmail);
        expect(response.status).toBe(200);
        expect(response.body).toBe('daniel@email.com');
    });

    test('POST /auth/getUserEmail - not authenticated', async () => {
        const response = await request(app).post('/auth/getUserEmail');
        expect(authenticationController.getEmail);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('None found');
    });
});