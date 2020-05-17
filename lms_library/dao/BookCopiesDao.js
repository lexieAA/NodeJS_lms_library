var db = require('./db');

exports.getAllBookCopies = function () {
    return new Promise(function (resolve, reject) {
        db.query('select * from library.tbl_book_copies', function (err, result) {
            return err ? reject(err) : resolve(result);
        });
    });;
};

exports.getBookCopiesByBranchId = function (branchId) {
    return new Promise(function (resolve, reject) {
        db.query('select * from library.tbl_book_copies where branchId = ?', [branchId], function (err, result) {
            return err ? reject(err) : resolve(result);
        });
    });;
};

exports.getBookCopiesById = function (branchId, bookId) {
    return new Promise(function (resolve, reject) {
        db.query('select * from library.tbl_book_copies where branchId = ? and bookId = ?', [branchId, bookId], function (err, result) {
            return err ? reject(err) : resolve(result);
        });
    });;
};

exports.updateNoOfBookCopies = function (bookCopy, cb) {
    db.query('update library.tbl_book_copies set noOfCopies = ? where branchId = ? and bookId = ?', [bookCopy.noOfCopies, bookCopy.branchId, bookCopy.bookId], function (err, result) {
        cb(err, result);
    });
};