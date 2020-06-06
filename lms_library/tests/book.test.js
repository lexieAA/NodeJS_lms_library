const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');
const should = chai.should();

chai.use(chaiHttp);

describe('LMS Test Suite - library books', () =>{
    it('should get a list of books via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getBooks').reply(200,[
            {
                "bookId": 5,
                "title": "The Smart Owl",
                "pubId": 3
            },
            {
                "bookId": 6,
                "title": "Tale of Two Crows",
                "pubId": 2
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/books")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get book list on GET as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/books")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle 404 when no branches on GET', (done) => {
        nock('http://localhost:3000/lms').get('/getBooks').reply(404,[{}],{'Accept': 'application/xml'});
        chai
            .request(server)
            .get("/lms/library/book")
            .end((err, res) => {
                res.should.have.status(404);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of books', (done) => {
        chai
            .request(server)
            .get("/lms/library/books")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
    });
});