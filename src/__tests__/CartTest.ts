import {TestHelper} from "../utilities/TestHelper";
import {app} from "../../app";
import {getConnection, getRepository} from "typeorm";
import {Cart} from "../entities/Cart";

const request = require("supertest");
let server: any;
let result: { (): any; (): Promise<any>; };


describe("CartController", () => {
    beforeAll(async () => {
        await TestHelper.instance.setupTestDB();

        const port = process.env.TEST_PORT ?? 4000;
        server = app.listen(port);

         result = async () => {
            const response = await request(server).post('/login')
                .send({email: 'user@gmail.com', password: 'admin'});
            return response.body.accessToken;
        }

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

            const authToken = await result();
            const response = await request(server)
                .get('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.statusCode).toEqual(200);
        });


        it('should return a descriptive message if user has no item in cart', async () => {

            const authToken = await result();
            const response = await request(server)
                .get('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.body.message).toEqual('User has no item in cart');
        });
    });

    describe("POST: /cart/items", () => {

        it('should return 400, when you attempt to add item to cart with no request body', async () => {

            const authToken = await result();
            const response = await request(server)
                .post('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send();

            expect(response.statusCode).toEqual(400);
        });


        it('should return a descriptive message if quantity exceeds available quantity', async () => {

            const authToken = await result();
            const response = await request(server)
                .post('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    productVariantId: 1,
                    quantity: 11,
                });

            expect(response.body.message).toEqual('Quantity exceed currently available');
        });

        it('should add product variant to cart successfully', async () => {

            const authToken = await result();
            const response = await request(server)
                .post('/cart/items')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    productVariantId: 1,
                    quantity: 2,
                });

            expect(response.statusCode).toEqual(201);
        });


    });



    describe ("DELETE: /cart/item",  () => {

            let addCartItem = async () => {
                const authToken = await result();
                const response = await request(server)
                    .post('/cart/items')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        productVariantId: 1,
                        quantity: 2,
                    });
                return response.body.data.id;
            }


            let cartItem = async () => {
                const authToken = await result();
                const res = await request(server)
                    .get('/cart/items')
                    .set('Authorization', `Bearer ${authToken}`)

                return res.body.data[0].cartItems[0].id;
            }

            it(`should return 200 if cart is deleted successfully`, async () => {
            const authToken = await result();
            await addCartItem();
            const cart = await cartItem();

            console.log(JSON.stringify(cart) + 'cartthings');

            const response = await request(server)
                .delete(`/cart/items/${cart}`)
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.statusCode).toEqual(200);
        })


        it(`should return 404 if cart item doesn't exist`, async () => {

            const authToken = await result();


            const response = await request(server)
                .delete(`/cart/item/100`)
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.statusCode).toEqual(404);
        });
    });


    describe ("DELETE: /cart",  () => {

        it(`should return 200 if successful`, async () => {

            const cartItemId = async () => {
                const authToken = await result();
                const response = await request(server)
                    .post('/cart/items')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({
                        productVariantId: 1,
                        quantity: 2,
                    });
                return response.body.data.id;
            }

            const authToken = await result();
            const response = await request(server)
                .delete(`/cart`)
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.statusCode).toEqual(200);
        });
    });


    it(`should return 404 if user has no cart`, async () => {

        const authToken = await result();
        const response = await request(server)
            .delete(`/cart`)
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.statusCode).toEqual(404);
    });
});
