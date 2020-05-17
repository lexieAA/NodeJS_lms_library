var bookCopiesDao = require('../dao/bookCopiesDao');
var libraryBranchDao = require('../dao/libraryBranchesDao');

exports.getBranches = (function (req, res) {
    libraryBranchDao.getAllLibraryBranches()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBranchByBranchId = (function(branchId,req, res) {
    libraryBranchDao.getLibraryBranchById(branchId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch = (function(branchId, branchName, branchAddress, req, res) {
    console.log(branchAddress);
    libraryBranchDao.updateLibraryBranch(branchId, branchName, branchAddress, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update Library Branch Failed!');
        }
        res.status(201);
        res.send('Update Library Branch Successful!');
    });
});

exports.getBookCopies = (function(branchId, req, res) {
    bookCopiesDao.getBookCopiesByBranchId(branchId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookCopy = (function(branchId, bookId, req, res) {
    bookCopiesDao.getBookCopiesById(branchId, bookId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBookCopyCount = (function(req, res) {
    bookCopiesDao.updateNoOfBookCopies(bookCopy, branchId, bookId, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update nunber of Book Copies Failed!');
        }
        res.status(201);
        res.send('Update nunber of Book Copies Successful!');
    });
});