var bookCopiesDao = require('../dao/bookCopiesDao');
var libraryBranchDao = require('../dao/libraryBranchesDao');
var xml2js = require('xml2js');

exports.getBranches = (function (req, res) {
    libraryBranchDao.getAllLibraryBranches()
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBranchByBranchId = (function(branchId,req, res) {
    libraryBranchDao.getLibraryBranchById(branchId)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch = (function(branchId, branchName, branchAddress, req, res) {
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
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookCopy = (function(branchId, bookId, req, res) {
    bookCopiesDao.getBookCopiesById(branchId, bookId)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result[0]);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBookCopyCount = (function(bookCopyNum, branchId, bookId,req, res) {
    bookCopiesDao.updateNoOfBookCopies(bookCopyNum, branchId, bookId, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update nunber of Book Copies Failed!');
        }
        res.status(201);
        res.send('Update nunber of Book Copies Successful!');
    });
});