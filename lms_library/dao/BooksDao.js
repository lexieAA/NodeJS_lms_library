const db = require("./db").getDb();

exports.getAllBooks = async () =>{
    let books = await db.query('select * from library.tbl_book');
        return books;
  };