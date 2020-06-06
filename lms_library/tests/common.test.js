const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

const should = chai.should();

chai.use(chaiHttp);

describe('LMS common Test Suite', () =>{
    it('should throw 404 if url is incorrect', (done) => {
        chai
            .request(server)
            .get("/lms/library/something")
            .end((err, res) => {
                res.should.have.status(404);
                done();
        });
        
    });
});
