import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

chai.should();
chai.use(chaiHttp);

/**
 *Test the GET by ID route
 */
describe('GET /api/v1/red-flags/:id', () => {
    it('should get matching red-flag record', (done) => {
        chai.request(server)
            .get('/api/v1/red-flags/2')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return 404 if not found', (done) => {
        chai.request(server)
            .get('/api/v1/red-flags/4')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('should return 404 path is wrong', (done) => {
        chai.request(server)
            .get('/api/v1/red-flags/:test')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});