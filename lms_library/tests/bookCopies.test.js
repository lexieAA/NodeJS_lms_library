const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');
const should = chai.should();

chai.use(chaiHttp);

describe('LMS Test Suite - bookCopies', () =>{

    it('should get a list of bookCopies where the id is not 1 via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getBookCopiesWhereNotId').reply(200,[
            {
                "title": "The Book",
                "bookId": 2
            },
            {
                "title": "Love and Peace",
                "bookId": 1
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/books/1")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of book copies where the id is not 1', (done) => {
        chai
            .request(server)
            .get("/lms/library/books/1")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of book copies where the id is not 1 as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/books/1")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of bookcopies via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getAllBookCopies').reply(200,[
            {
                "bookId": 1,
                "title": "Art",
                "branchId": 1,
                "branchName": "Blue Library",
                "noOfCopies": 55
            },
            {
                "bookId": 1,
                "title": "Art",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 1
            }
        ]);
        chai
            .request(server)
            .get("/lms/library/bookcopies")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of book copies', (done) => {
        chai
            .request(server)
            .get("/lms/library/bookcopies")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of book copies as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/bookcopies")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of bookcopies like "the" via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getBookCopiesLikes').reply(200,[
            {
                "bookId": 1,
                "title": "Art",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 1
            },
            {
                "bookId": 8,
                "title": "How to Cook with a Dish Washer",
                "branchId": 3,
                "branchName": "Kings Hills Library",
                "noOfCopies": 2
            },
        ]);
        chai
            .request(server)
            .get("/lms/library/bookcopies/like/the")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of book copies like "the"', (done) => {
        chai
            .request(server)
            .get("/lms/library/bookcopies/like/the")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of book copies like "the" as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/bookcopies/like/the")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    it('should get a list of bookcopies by branchId via nock', (done) => {
        nock('http://localhost:3000/lms').get('/getBookCopies').reply(200,[
            {
                "bookId": 1,
                "title": "Art",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 1
            },
            {
                "bookId": 8,
                "title": "How to Cook with a Dish Washer",
                "branchId": 3,
                "branchName": "Kings Hills Library",
                "noOfCopies": 2
            },
        ]);
        chai
            .request(server)
            .get("/lms/library/branches/branch/1/bookcopies")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a list of book copies by branchId', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/1/bookcopies")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a list of book copies by branchId as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/1/bookcopies")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                
                done();
        });
        
    });

    it('should get a book copies by branchId and bookId via nock', (done) => {
        nock('http://localhost:3000/lms/library/branches/branch/2/bookcopies/book/1').get('/getBookCopiesById').reply(200,[
            {
                "bookId": 1,
                "title": "School",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 16
            },
            {
                "bookId": 8,
                "title": "How to Cook with a Dish Washer",
                "branchId": 3,
                "branchName": "Kings Hills Library",
                "noOfCopies": 2
            },
        ]);
        chai
            .request(server)
            .get("/lms/library/branches/branch/2/bookcopies/book/1")
            .end((err, res) => {
                should.equal(err,null);
                res.body.should.be.an('array');
                res.should.have.status(200);
                done();
        });
        
    });

    it('should handle accept not accepted, get a book copies by branchId and bookId', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/2/bookcopies/book/1")
            .set('accept', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should get a book copies by branchId and bookId, as xml', (done) => {
        chai
            .request(server)
            .get("/lms/library/branches/branch/2/bookcopies/book/1")
            .set('accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
        
    });

    // it('should update book copies by branchId and bookId', (done) => {
    //     nock('http://localhost:3000/lms').get('/updateBookCopyCount').reply(200,[
    //         {
    //             "bookId": 1,
    //             "title": "Art",
    //             "branchId": 2,
    //             "branchName": "NightLight Library",
    //             "noOfCopies": 1
    //         },
    //         {
    //             "bookId": 8,
    //             "title": "How to Cook with a Dish Washer",
    //             "branchId": 3,
    //             "branchName": "Kings Hills Library",
    //             "noOfCopies": 2
    //         },
    //     ]);
    //     chai
    //         .request(server)
    //         .put("/lms/library/branches/branch/2/bookcopies/book/1")
    //         .set('content-type', 'application/json')
    //         .end((err, res) => {
    //             should.equal(err,null);
    //             res.should.have.status(200);
    //             done();
    //     });
        
    // });

    it('should handle content-type not accepted, update branch by branchId and bookId', (done) => {
        chai
            .request(server)
            .put("/lms/library/branches/branch/2/bookcopies/book/2", [])
            .set('content-type', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should update book copies', (done) => {
        chai
            .request(server)
            .put("/lms/library/bookcopies")
            .set('content-type', 'application/json')
            .send( {
                "bookId": 1,
                "title": "Art",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 1
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
            .put("/lms/library/bookcopies", [])
            .set('content-type', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

    it('should handle create book copies error', (done) => {
        chai
            .request(server)
            .post("/lms/library/bookcopies")
            .set('content-type', 'application/json')
            .send( {
                "bookId": 1,
                "title": "The Art Book",
                "branchId": 2,
                "branchName": "NightLight Library",
                "noOfCopies": 1
            })
            .end((err, res) => {
                should.equal(err,null);
                res.should.have.status(404);
                done();
        });
        
    });

    // it('should create book copies', (done) => {
    //     chai
    //         .request(server)
    //         .post("/lms/library/bookcopies", [{"bookId": 1,
    //         "title": "The Art Book",
    //         "branchId": 2,
    //         "branchName": "NightLight Library",
    //         "noOfCopies": 1}])
    //         .set('content-type', 'application/json')
    //         .end((err, res) => {
    //             should.equal(err,null);
    //             res.should.have.status(201);
    //             done();
    //     });
        
    // });

    it('should handle content-type not accepted, create branch', (done) => {
        chai
            .request(server)
            .post("/lms/library/bookcopies", [])
            .set('content-type', 'application/javascript')
            .end((err, res) => {
                res.should.have.status(406);
                done();
        });
        
    });

});