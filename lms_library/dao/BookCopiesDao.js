var db = require('./db');

exports.getBookCopiesByBranchId = function (branchId) {
    return new Promise(function (resolve, reject) {
        db.query('select * from library.tbl_book_copies where branchId = ?', [branchId], function (err, result) {
            return err ? reject(err) : resolve(result);
        });
    });;
};

exports.getBookCopiesById = function (branchId, bookId) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT tb.bookId AS bookId, tb.title AS title, tbc.branchId As branchId, tlb.branchName As branchName,tbc.noOfCopies As noOfCopies FROM tbl_book_copies  As tbc INNER JOIN tbl_book AS tb on tbc.bookId = tb.bookId INNER JOiN tbl_library_branch AS tlb ON tbc.branchId = tlb.branchId WHERE tlb.branchId = ? AND tbc.bookId = ?', [branchId, bookId], function (err, result) {
            return err ? reject(err) : resolve(result);
        });
    });;
};

exports.updateNoOfBookCopies = function (bookCopyNum, branchId, bookId, cb) {
    db.query('update library.tbl_book_copies set noOfCopies = ? where branchId = ? and bookId = ?', [bookCopyNum, branchId, bookId], function (err, result) {
        cb(err, result);
    });
};