import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.should();
chai.use(chaiHttp);

describe('Red-Flag API', () => {
    /**
     *Test the GET route
     */
    describe("GET /api/v1/red-flags", () => {
        it("It should GET all the red-flags", (done) => {
            chai.request(server)
                .get("/api/v1/red-flags")
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });

});