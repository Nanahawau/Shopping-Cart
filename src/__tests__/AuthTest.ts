import {TestHelper} from "../utilities/TestHelper";
import {app} from "../../app";

const request = require("supertest");
let server: any;


describe("AuthController", () => {
    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();

        const port = process.env.TEST_PORT ?? 4000;
        server = app.listen(port);

    });

    afterAll( (done) => {
         TestHelper.instance.teardownTestDB();
         server.close(done);
    });

   it ('login Should return 401 when using invalid credentials', async () => {
        const result = await request(server).post('/login')
            .send({email: 'admin@gmail.com', password: 'admin'});
       expect(result.statusCode).toEqual(401);
   });

    it ('login Should return 400 when using empty request body', async () => {
        const result = await request(server).post('/login')
            .send({});

        expect(result.statusCode).toEqual(400);
    });

    it ('login Should return 401 when using invalid password', async () => {
        const result = await request(server).post('/login')
            .send({email: 'user@gmail.com', password: 'user'});
        expect(result.statusCode).toEqual(401);
    });

    it ('login Should return 201 when using valid credentials', async () => {
        const result = await request(server).post('/login')
            .send({email: 'user@gmail.com', password: 'admin'});
        expect(result.statusCode).toEqual(201);
    });
});

