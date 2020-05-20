
var routes = require('express').Router();
const bodyParse = require('body-parser');
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const xmlparser = require('express-xml-bodyparser');
routes.use(xmlparser());
routes.use(bodyParse.json());
var libraryService = require('../services/libraryServices');


routes.get('/lms/library/branches',function(req,res){
    libraryService.getBranches(req,res);
});

routes.get('/lms/library/branches/branch/:branchId',function(req,res){
    libraryService.getBranchByBranchId (req.params.branchId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId',function(req,res){
    let body;
    let branchName;
    console.log(req.get('Content-Type'));
    let branchAddress;
    if (req.is('application/json') == 'application/json' ) {
        body = req.body[0];
        branchName = body.branchName;
        branchAddress = body.branchAddress;

    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchName = body['branchname'][0];
        branchAddress = body['branchaddress'][0];
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
    console.log(req.get('Content-Type'));
    let branchAddress;
    if (req.is('application/json') == 'application/json' ) {
        body = req.body[0];
        bookCopyNum = body.noOfCopies;

    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        bookCopyNum = body.noofcopies[0];
    }

    libraryService.updateBookCopyCount(bookCopyNum,req.params.branchId, req.params.bookId, req,res);
});

module.exports = routes;