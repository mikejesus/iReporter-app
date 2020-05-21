import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.should();
chai.use(chaiHttp);

const redFlagDelete = {
    id: 1,
    title: 'New case',
    description: 'We got a new case here',
    createdOn: '2020-05-20T15:39:32.548Z',
    type: 'red-flag',
    location: '63736, 098373',
    status: 'draft',
    Images: [],
    Videos: [],
    comment: 'We shall intimate you soon',
};

describe('DELETE red-flag record', () => {
    it('should return a success status 200', (done) => {
        chai.request(server)
            .delete('/api/v1/red-flags/1')
            .send(redFlagDelete)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should return correct error message', (done) => {
        chai.request(server)
            .delete('/api/v1/red-flags/1')
            .send(redFlagDelete)
            .end((err, res) => {
                res.body.should.deep.equal({
                    status: 404,
                    error: 'Red-flag does not exists',
                });
                done();
            });
    });
});