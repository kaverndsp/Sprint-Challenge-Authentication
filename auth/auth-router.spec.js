const request = require("supertest");
const db = require("../database/dbConfig.js");
const User = require("../users/users-model.js");
const server = require("../api/server.js");


describe("auth-router.js", () => {
    describe("REGISTER", () => {
        it("check if a user with the correct shape of data can register", async () => {
            const user = {
                username: 'Daniel2',
                password: 'password2'
            };
            
            User.add(user);

            const users = await db("users");
            expect(users).toHaveLength(2);
        });

        it('responds with 201', async () => {
            const user = {
                username: 'Daniel3',
                password: 'password3'
            };
            const res = await request(server)
                .post('/api/auth/register')
                .send(user);
            expect(res.status).toBe(201);
            });
    
    });

    describe("LOGIN", () => {
        it('responds with 200', async () => {
            const user = {
                username: 'Daniel',
                password: 'password'
            };
            await request(server)
                .post('/api/auth/register')
                .send(user);
            
            const res = await request(server)
                .post('/api/auth/login')
                .send(user);
            
            expect(res.status).toBe(200);
    
        });

        it('server gives a 401 if credientials are invalid', async () => {
            const user = {
                username: 'NotDaniel',
                password: 'notapassword'
            };

            const res = await request(server)
                .post('/api/auth/login')
                .send(user);
            
            expect(res.status).toBe(401);
           
        });
    
    });

});