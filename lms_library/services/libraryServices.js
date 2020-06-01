let bookCopiesDao = require('../dao/bookCopiesDao');
let libraryBranchDao = require('../dao/libraryBranchesDao');
let xml2js = require('xml2js');
const db = require("../dao/db").getDb();

exports.getBranches = (async function (req, res) {
    try{
        let result = await libraryBranchDao.getAllLibraryBranches();
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

exports.getBranchesLikes = (async function (branchName, req, res) {
    await libraryBranchDao.getBranchesLikes(branchName)
        .then(function (result) {
            res.querySuccess = true;
            res.queryResults = result;
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
});

exports.getBranchByBranchId = (async function (branchId, req, res) {
    try{
        let result = await libraryBranchDao.getLibraryBranchById(branchId);
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

exports.updateBranch = (async function (branchId, branchName, branchAddress, req, res) {
    await db.beginTransaction();
    console.log(branchAddress +branchId+branchName);
    await libraryBranchDao.updateLibraryBranch(branchId, branchName, branchAddress)
        .then(function (result) {
            if(result.affectedRows == 0){
                res.querySuccess = false;
                console.log(result);
                console.log("in if");
            }else{
                res.querySuccess = true;
                res.queryResults = result;
                console.log(result);
                console.log("in else");
            }
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
    if(res.querySuccess){
        await db.commit();
    }else{
        await db.rollback();
    }
});

exports.getAllBookCopies = (async function (req, res) {
    try{
        let result = await bookCopiesDao.getAllBookCopies();
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

exports.getBookCopies = (async function (branchId, req, res) {
    await bookCopiesDao.getBookCopiesByBranchId(branchId)
        .then(function (result) {
            if(result.length == 0){
                res.querySuccess = false;
            }else{
                res.querySuccess = true;
                res.queryResults = result;
            }
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
});

exports.getBookCopiesLikes = (async function (title, req, res) {
    await bookCopiesDao.getAllBookCopiesLike(title)
         .then(function (result) {
            res.querySuccess = true;
            res.queryResults = result;
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
});


exports.getBookCopy = (async function (branchId, bookId, req, res) {
    await bookCopiesDao.getBookCopiesById(branchId, bookId)
        .then(function (result) {
            if(result.length == 0){
                res.querySuccess = false;
            }else{
                res.querySuccess = true;
                res.queryResults = result;
            }
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
});             

exports.updateBookCopyCount = (async function (bookCopyNum, branchId, bookId, req, res) {
    await db.beginTransaction();
    await bookCopiesDao.updateNoOfBookCopies(bookCopyNum, branchId, bookId)
        .then(function (result) {
            if(result.affectedRows == 0){
                res.querySuccess = false;
            }else{
                res.querySuccess = true;
                res.queryResults = result;
            }
        })
        .catch(function (err) {
            res.querySuccess = false;
        });
    if(res.querySuccess){
        await db.commit();
    }else{
        await db.rollback();
    }
});