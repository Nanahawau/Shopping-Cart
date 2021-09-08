import {TestHelper} from "../utilities/TestHelper";
import {app} from "../../app";

const request = require("supertest");
let server: any;

describe("CartController", () => {
    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();

        const port = process.env.TEST_PORT ?? 4000;
        server = app.listen(port);
    });

    afterAll( (done) => {
         TestHelper.instance.teardownTestDB();
         server.close(done);
    });

    describe("GET: /cart/items", () => {
        it ('Should return 401 when making a request with no token in header', async () => {
            const result = await request(server).get('/cart/items')
                .send({email: 'admin@gmail.com', password: 'admin'});
            expect(result.statusCode).toEqual(401);
        })

        it('should return 200 if successful', async () => {
            const result = async () => {
                const response = await request(server).post('/login')
                    .send({email: 'user@gmail.com', password: 'admin'});
                return response.body.accessToken;
            }
            const authToken = await result();
            const response = await request(server)
                .get('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.statusCode).toEqual(200);
        });
    });

    describe("POST: /cart/items", () => {
        it('should add product variant to cart successfully', async () => {
            const result = async () => {
                const response = await request(server).post('/login')
                    .send({email: 'user@gmail.com', password: 'admin'});
                return response.body.accessToken;
            }

            const authToken = await result();
            const response = await request(server)
                .post('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    productVariantId: 1,
                    quantity: 10,
                });

            expect(response.statusCode).toEqual(201);
        });

        it('should return 400, when you attempt to add item to cart with no request body', async () => {
            const result = async () => {
                const response = await request(server).post('/login')
                    .send({email: 'user@gmail.com', password: 'admin'});
                return response.body.accessToken;
            }
            const authToken = await result();
            const response = await request(server)
                .post('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send();

            expect(response.statusCode).toEqual(400);
        });
    });

    describe ("DELETE: /cart/items/:itemId", () => {
        it(`should return 200 if cart items doesn't exist`, async () => {
            const result = async () => {
                const response = await request(server).post('/login')
                    .send({email: 'user@gmail.com', password: 'admin'});
                return response.body.accessToken;
            }




            const authToken = await result();
            const response = await request(server)
                .delete(`/cart/items/30`)
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.statusCode).toEqual(200);
        });

        //TODO: returns a 200, if item exists
        // it(`should return 200 if cart items doesn't exist`, async () => {
        //     const result = async () => {
        //         const response = await request(server).post('/login')
        //             .send({email: 'user@gmail.com', password: 'admin'});
        //         return response.body.accessToken;
        //     }
        //
        //     const authToken = await result();
        //     const response = await request(server)
        //         .delete(`/cart/items/30`)
        //         .set('Authorization', `Bearer ${authToken}`)
        //     expect(response.statusCode).toEqual(404);
        // });
    });

    describe ("DELETE: /cart", () => {
        it(`should return 404 if cart doesn't exist`, async () => {
            const result = async () => {
                const response = await request(server).post('/login')
                    .send({email: 'user@gmail.com', password: 'admin'});
                return response.body.accessToken;
            }
            const authToken = await result();
            const response = await request(server)
                .delete('/cart')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.statusCode).toEqual(404);
        });
    });
});
