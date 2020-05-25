var bookCopiesDao = require('../dao/bookCopiesDao');
var libraryBranchDao = require('../dao/libraryBranchesDao');
var xml2js = require('xml2js');

exports.getBranches = (async function (req, res) {
    try{
        let result = await libraryBranchDao.getAllLibraryBranches();
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

exports.getBranchByBranchId = (async function (branchId, req, res) {
    try{
        let result = await libraryBranchDao.getLibraryBranchById(branchId);
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

exports.updateBranch = (async function (branchId, branchName, branchAddress, req, res) {
    await libraryBranchDao.updateLibraryBranch(branchId, branchName, branchAddress)
        .then(function (result) {
            res.retCode = result.affectedRows;
        })
        .catch(function (err) {
            res.retCode = 0;
        });
});

exports.getBookCopies = (async function (branchId, req, res) {
    await bookCopiesDao.getBookCopiesByBranchId(branchId)
        .then(function (result) {
            if(result.length == 0){
                res.retCode = 0; 
            }else{
                res.retCode = 1;
                res.queryResults = result;
            }
        })
        .catch(function (err) {
            res.retCode = 0;
        });
});


exports.getBookCopy = (async function (branchId, bookId, req, res) {
    await bookCopiesDao.getBookCopiesById(branchId, bookId)
        .then(function (result) {
            if(result.length() == 0){
                res.retCode = 0; 
            }else{
                res.retCode = 1;
                res.queryResults = result;
            }
        })
        .catch(function (err) {
            res.retCode = 0;
        });
});             

exports.updateBookCopyCount = (function (bookCopyNum, branchId, bookId, req, res) {
    bookCopiesDao.updateNoOfBookCopies(bookCopyNum, branchId, bookId,function(err, result){
        if(err){
          //res.status(400);
          res.send('Delete Book Failed!');
          console.log(result + "from ser error");
        }
        res.send('Delete Book Successful!');
        console.log(result.changedRows + "from ser");
      });
    });