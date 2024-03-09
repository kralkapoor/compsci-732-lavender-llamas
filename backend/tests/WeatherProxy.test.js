const request = require('supertest');
const express = require('express');
const axios = require('axios');
const { fetchUserLocation } = require('../controllers/HomePage');
const router = require('../routes/WeatherProxy');

jest.mock('axios');
jest.mock('../controllers/HomePage');

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /data', () => {
    // mimic accessing the route to get the fake data
    it('should fetch weather data', async () => {
        const mockUserLocation = 'Auckland';
        const mockWeatherData = {
            location: {
                localtime: '2023-05-11 12:00'
            },
            current: {
                condition: {
                    text: 'Sunny',
                    icon: '/path/to/icon',
                },
                temp_c: 20,
                humidity: 70,
                wind_kph: 10,
            },
        };

        fetchUserLocation.mockResolvedValue(mockUserLocation);
        axios.get.mockResolvedValue({ data: mockWeatherData });

        const res = await request(app).get('/data');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('location', mockUserLocation);
        expect(res.body).toHaveProperty('currTime', mockWeatherData.location.localtime);
        expect(res.body).toHaveProperty('condition', mockWeatherData.current.condition.text);
        expect(res.body).toHaveProperty('tempC', `${mockWeatherData.current.temp_c} C`);
        expect(res.body).toHaveProperty('humidity', `${mockWeatherData.current.humidity}%`);
        expect(res.body).toHaveProperty('windKph', `${mockWeatherData.current.wind_kph} km/h`);
        expect(res.body).toHaveProperty('iconUrl', mockWeatherData.current.condition.icon);
    });

    it('should handle errors', async () => {
        fetchUserLocation.mockResolvedValue('Auckland');
        axios.get.mockRejectedValue(new Error());

        const res = await request(app).get('/data');

        expect(res.statusCode).toEqual(418);
        expect(res.text).toEqual("Unexpected teapot error");
    });
});
