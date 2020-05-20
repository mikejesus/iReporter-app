import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.should();
chai.use(chaiHttp);


const redFlag = {
    title: 'New Red-flag',
    description: 'We have new case',
    createdBy: 'Michael',
    type: 'red-flag',
    location: '20001, 099282',
    comment: "Red-flag record"
};

describe('/PATCH Edit red-flag record by location', () => {
    it('should return a success status 201', (done) => {
        chai.request(server)
            .patch('/api/v1/red-flags/1/"23344, 2345')
            .send([redFlag])
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('It should return 404 error if red-flag record is not found', (done) => {
        chai.request(server)
            .patch('/api/v1/red-flags/6/"2003,88993"')
            .send([redFlag])
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('It should return the specified error message', (done) => {
        chai.request(server)
            .patch('/api/v1/red-flags/6/"2003,88993"')
            .send([redFlag])
            .end((err, res) => {
                res.body.should.be.deep.equal({
                    status: 404,
                    error: 'red flag record not found',
                });
                done();
            });
    });
});