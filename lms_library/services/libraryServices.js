var bookCopiesDao = require('../dao/bookCopiesDao');
var libraryBranchDao = require('../dao/libraryBranchDao');

exports.getBranches(function (req, res) {
    libraryBranchDao.getAllLibraryBranches()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBranch(bookId, function (req, res) {
    libraryBranchDao.getLibraryBranchById(bookId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch(libraryBranch, function (req, res) {
    libraryBranchDao.updateLibraryBranch(libraryBranch, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update Library Branch Failed!');
        }
        res.status(201);
        res.send('Update Library Branch Successful!');
    });
});

exports.getBookCopies(branchId, function (req, res) {
    bookCopiesDao.getAllBookCopies(branchId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookCopy(function (req, res) {
    bookCopiesDao.getBookCopiesByBranchId()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBookCopyCount(function (req, res) {
    bookCopiesDao.updateNoOfBookCopies(bookCopy, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update nunber of Book Copies Failed!');
        }
        res.status(201);
        res.send('Update nunber of Book Copies Successful!');
    });
});