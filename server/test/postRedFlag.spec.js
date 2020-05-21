import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js';

chai.should();
chai.use(chaiHttp);

const redFlag = {
    title: 'New Corruption Case alert',
    description: 'This is a new red-flag for corruption',
    createdBy: 'Michael',
    type: 'red-flag',
    location: '880008, 196000',
    createdOn: new Date(),
    status: "draft",
    Images: [],
    Videos: [],
    comment: 'Main case captured',
};


describe('/POST Create new red-flag', () => {
    it('It should create a new red-flag record with correct status code', (done) => {
        chai.request(server)
            .post('/api/v1/red-flags')
            .send(redFlag)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.status.should.be.equal(201);
                done();
            });
    });

    it('it should create a new red-flag with required fields', (done) => {
        chai.request(server)
            .post('/api/v1/red-flags')
            .send(redFlag)
            .end((err, res) => {
                res.body.data[0].should.have.include.key('title');
                res.body.data[0].should.have.include.key('createdBy');
                res.body.data[0].should.have.include.key('type');
                res.body.data[0].should.have.include.key('location');
                res.body.data[0].should.have.include.key('description');
                done();
            });
    });
});