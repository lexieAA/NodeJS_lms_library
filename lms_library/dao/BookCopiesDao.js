var db = require('./db');

exports.getAllBookCopies = function(cb){
    db.query('select * from library.tbl_book_copies', function(err, result) {
        cb(err, result);
      });
};

exports.getBookCopiesByBranchId= function(branchId, cb){
    db.query('select * from library.tbl_book_copies where branchId = ?', [branchId],  function(err, result) {
        cb(err, result);
      });
  };

  exports.getBookCopiesById= function(branchId, bookId,cb){
    db.query('select * from library.tbl_book_copies where branchId = ? and bookId = ?', [branchId, bookId],  function(err, result) {
        cb(err, result);
      });
  };

  exports.updateNoOfBookCopies= function(bookCopy,cb){
    db.query('update library.tbl_book_copies set noOfCopies = ? where branchId = ? and bookId = ?', [bookCopy.noOfCopies, bookCopy.branchId, bookCopy.bookId],  function(err, result) {
        cb(err, result);
      });
  };