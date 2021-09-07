// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
// @ts-ignore
import app from '../app';
chai.should();

describe("AuthController", () => {
    describe("POST /login", () => {
        //
        it("Should fail if login credentials is invalid", (done) => {
            supertest(app)
                .post('/login')
                .send({
                    email: 'admin@example.com',
                    password: 'admin1',
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        })
    })
});