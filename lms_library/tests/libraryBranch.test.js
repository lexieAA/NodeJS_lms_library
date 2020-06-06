const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');
const should = chai.should();

chai.use(chaiHttp);

describe('LMS Test Suite - library branches', () =>{

    it('should get a list of branches via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getBranches').reply(200,[
            {
                "branchId": 9,
                "branchName": "Ash Library",
                "branchAddress": "25 S. Hartford Lane West Lafayette, WA 47906"
            },
            {
                "branchId": 1,
                "branchName": "Blue Flower Library",
                "branchAddress": "602 Water Dr.Arlington Heights, IL 60004"
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/branches")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of branches via nock', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of branches via nock as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of branches on GET', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of branches via nock that is like a branch name', (done) => {
        nock('http://localhost:3000/lms').get('/getBranchesLikes').reply(200,[
            {
                "branchId": 1,
                "branchName": "Blue Flower Library",
                "branchAddress": "602 Water Dr.Arlington Heights, IL 60004"
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/branches/like/:branchName")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of branches that is like a branch name', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/like/blue")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of branches that is like a branch name as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/like/blue")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of branches via nock by branch id', (done) => {
        nock('http://localhost:3000/lms').get('/getBranchByBranchId').reply(200,[
            {
                "branchId": 1,
                "branchName": "Blue Flower Library",
                "branchAddress": "602 Water Dr.Arlington Heights, IL 60004"
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/branches/branch/1")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a branches by branch id as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/1")
            .set('accept', 'application/xml')
            .end((err, res) => {
                should.equal(err,null);
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle not accepted type a branches by branch id', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/1")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                should.equal(err,null);
                res.should.have.status(406);
                done();
        });
        
    });

    it('should update branch by branchId', (done) => {
        chai
            .request(server)
            .put("/lms/library/branches/branch/1", [
                
            ])
            .set('content-type', 'application/json')
            .send([{
                "branchId": 1,
                "branchName": "Blue Library",
                "branchAddress": "800 Water Dr.Arlington Heights, IL 60004"
            }])
            .end((err, res) => {
                should.equal(err,null);
                res.should.have.status(201);
                done();
        });
        
    });

    it('should handle content-type not accepted, update branch by branchId', (done) => {
        chai
            .request(server)
            .put("/lms/library/branches/branch/5", [])
            .set('accepts', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should update branch', (done) => {
        chai
            .request(server)
            .put("/lms/library/branches/branch")
            .set('content-type', 'application/json')
            .send({
                "branchId": 1,
                "branchName": "Blue Library",
                "branchAddress": "800 Water Dr.Arlington Heights, IL 60004"
            })
            .end((err, res) => {
                should.equal(err,null);
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle content-type not accepted, update branch', (done) => {
        chai
            .request(server)
            .put("/lms/library/branches/branch", [])
            .set('content-type', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });
    
});

