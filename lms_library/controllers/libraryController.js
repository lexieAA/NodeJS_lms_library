
var routes = require('express').Router();
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
var libraryService = require('../services/libraryServices');

routes.get('/lms/library/branches',function(req,res){
    libraryService.getBranches(req,res);
});

routes.get('/lms/library/branches/branch/:branchId',function(req,res){
    libraryService.getBranchByBranchId (req.params.branchId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId',function(req,res){
    const body = req.body;
    const branchName = body.branchName;
    const branchAddress = body.branchAddress;
    libraryService.updateBranch(req.params.branchId, branchName, branchAddress, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies',function(req,res){
    libraryService.getBookCopies(req.params.branchId, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    libraryService.getBookCopy(req.params.branchId, req.params.bookId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    const body = req.body;
    const bookCopyNum = body.noOfCopies;

    libraryService.updateBookCopyCount(bookCopyNum,req.params.branchId, req.params.bookId, req,res);
});

module.exports = routes;