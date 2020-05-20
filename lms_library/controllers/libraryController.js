
let routes = require('express').Router();
const bodyParse = require('body-parser');
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const xmlparser = require('express-xml-bodyparser');
routes.use(xmlparser());
routes.use(bodyParse.json());
let libraryService = require('../services/libraryServices');


routes.get('/lms/library/branches',function(req,res){
    libraryService.getBranches(req,res);
});

routes.get('/lms/library/branches/branch/:branchId',function(req,res){
    libraryService.getBranchByBranchId (req.params.branchId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId',function(req,res){
    let body;
    let branchName;
    let branchAddress;
    if (req.is('application/json') == 'application/json' ) {
        body = req.body[0];
        branchName = body.branchName;
        branchAddress = body.branchAddress;

    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchName = body['branchname'][0];
        branchAddress = body['branchaddress'][0];
    }// content negotiation failure
    else {
        res.send(406);
    }
    
    libraryService.updateBranch(req.params.branchId, branchName, branchAddress, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies',function(req,res){
    libraryService.getBookCopies(req.params.branchId, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    libraryService.getBookCopy(req.params.branchId, req.params.bookId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    let body;
    let bookCopyNum;
    if (req.is('application/json') == 'application/json' ) {
        body = req.body[0];
        bookCopyNum = body.noOfCopies;

    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        bookCopyNum = body.noofcopies[0];
    }// content negotiation failure
    else {
        res.send(406);
    }

    libraryService.updateBookCopyCount(bookCopyNum,req.params.branchId, req.params.bookId, req,res);
});

module.exports = routes;