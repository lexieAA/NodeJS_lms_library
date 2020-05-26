const db = require("./db").getDb();

exports.getBookCopiesByBranchId = async (branchId) =>{
    let copy = await db.query('select * from library.tbl_book_copies where branchId = ?', [branchId]);
    return copy; 
};

exports.getBookCopiesById = async (branchId, bookId) => {
    let copy = await db.query('SELECT tb.bookId AS bookId, tb.title AS title, tbc.branchId As branchId, tlb.branchName As branchName,tbc.noOfCopies As noOfCopies FROM tbl_book_copies  As tbc INNER JOIN tbl_book AS tb on tbc.bookId = tb.bookId INNER JOiN tbl_library_branch AS tlb ON tbc.branchId = tlb.branchId WHERE tlb.branchId = ? AND tbc.bookId = ?', [branchId, bookId]);
    return copy;     
};

exports.updateNoOfBookCopies = async (bookCopyNum, branchId, bookId) =>{
   let update = await db.query('update library.tbl_book_copies set noOfCopies = ? where branchId = ? and bookId = ?', [bookCopyNum, branchId, bookId]);
   return update
};