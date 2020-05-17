
var routes = require('express').Router();
//var db = require('../dao/db');
var libraryBranchDao = require('../dao/LibraryBranchesDao');
var libraryService = require('../services/libraryServices');

routes.get('/lms/library/branches',function(req,res){
    libraryService.getBranches(req,res);
});

routes.get('/lms/library/branches/branch/:branchId',function(req,res){
    libraryService.getBranchByBranchId (req.params.branchId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId',function(req,res){
    const branchName = req.body.branchName;
    const branchAddress = req.body.branchAddress;
    console.log(branchName);
    libraryService.updateBranch(req.params.branchId, branchName, branchAddress, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies',function(req,res){
    libraryService.getBookCopies(req.params.branchId, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    libraryService.getBookCopy(req.params.branchId, req.params.bookId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    const bookCopy = req.body;
    libraryService.updateBookCopyCount(bookCopy,req.params.branchId, req.params.bookId, req,res);
});

module.exports = routes;