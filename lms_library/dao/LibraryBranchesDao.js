var db = require('./db');

exports.getAllLibraryBranches = function () {
  return new Promise(function (resolve, reject) {
    db.query('select * from library.tbl_library_branch', function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.getLibraryBranchById = function (branchId) {
  return new Promise(function (resolve, reject) {
    db.query('select * from library.tbl_library_branch where branchId = ?', [branchId], function (err, result) {
      return err ? reject(err) : resolve(result);
    });
  });;
};

exports.updateLibraryBranch = function (libraryBranch, cb) {
  db.query('update library.tbl_library_branch set noOfCopies = ? where branchId = ? and bookId = ?', [libraryBranch.branchName, libraryBranch.branchAddress, libraryBranch.branchId], function (err, result) {
    cb(err, result);
  });
};