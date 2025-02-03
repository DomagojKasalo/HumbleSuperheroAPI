const request = require('supertest');
const express = require('express');
const superheroRoutes = require('../routes/superheroes');
const superheroes = require('../data/superheroes');

const app = express();
app.use(express.json());
app.use('/superheroes', superheroRoutes);

describe('Superheroes API', () => {
    it('should add a new superhero', async () => {
        const response = await request(app)
            .post('/superheroes')
            .send({
                name: 'Captain America',
                superpower: 'Super Strength',
                humilityScore: 10
            });

        expect(response.status).toBe(201);
    });

    beforeEach(() => {
        superheroes.length = 0;  
        superheroes.push(
            { id: 1, name: 'Superman', superpower: 'Flying', humilityScore: 5 },
            { id: 2, name: 'Batman', superpower: 'Martial Arts', humilityScore: 8 },
            { id: 3, name: 'Spider-Man', superpower: 'Web Swinging', humilityScore: 9 }
        );
    });

    it('should return superheroes sorted by humilityScore', async () => {
        const response = await request(app).get('/superheroes');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(1);

        for (let i = 0; i < response.body.length - 1; i++) {
            expect(response.body[i].humilityScore).toBeGreaterThanOrEqual(response.body[i + 1].humilityScore);
        }
    });

    it('should return an error if humilityScore is invalid', async () => {
        const response = await request(app)
            .post('/superheroes')
            .send({
                name: 'Thor',
                superpower: 'Lightning',
                humilityScore: 15  
            });

        expect(response.status).toBe(400);
    });
});
