var db = require('./db');

exports.getAllLibraryBranches = function(cb){
    db.query('select * from library.tbl_library_branch', function(err, result) {
        cb(err, result);
      });
};

exports.getLibraryBranchById= function(branchId, cb){
  db.query('select * from library.tbl_library_branch where branchId = ?', [branchId],  function(err, result) {
      cb(err, result);
    });
};

exports.updateLibraryBranch= function(libraryBranch,cb){
  db.query('update library.tbl_library_branch set noOfCopies = ? where branchId = ? and bookId = ?', [libraryBranch.branchName, libraryBranch.branchAddress, libraryBranch.branchId],  function(err, result) {
      cb(err, result);
    });
};