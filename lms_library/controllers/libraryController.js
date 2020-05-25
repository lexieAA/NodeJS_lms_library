let routes = require('express').Router();
const bodyParse = require('body-parser');
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const xmlparser = require('express-xml-bodyparser');
routes.use(xmlparser());
routes.use(bodyParse.json());
let libraryService = require('../services/libraryServices');
let cors = require('cors');
routes.use(cors());


routes.get('/lms/library/branches', async (req, res) => {
    await libraryService.getBranches(req, res);

    if (res.querySuccess) {

        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        } else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(res.queryResults);
            res.send(xml);
            res.status(200);
        } else {
            res.sendStatus(406);
        }
    } else{
        res.sendStatus(404);
    }
});
            

routes.get('/lms/library/branches/branch/:branchId', async (req, res)  => {
    await libraryService.getBranchByBranchId(req.params.branchId, req, res);
    if (res.querySuccess) {
        
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        } else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(res.queryResults);
            res.send(xml);
            res.status(200);
        } else {
            res.sendStatus(406);
        }
    } else{
        res.sendStatus(404);
    }
});

routes.put('/lms/library/branches/branch/:branchId',  async (req, res) =>{
    let body;
    let branchName;
    let branchAddress;
    if (req.is('application/json') == 'application/json') {
        body = req.body[0];
        branchName = body.branchName;
        branchAddress = body.branchAddress;

    } else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchName = body['branchname'][0];
        branchAddress = body['branchaddress'][0];

    } if (req.is('application/xml') == 'application/xml' || req.is('application/json') == 'application/json') {
        await libraryService.updateBranch(req.params.branchId, branchName, branchAddress, req, res);
            if (res.retCode == 1) {
            res.status(201);
            res.send('Update Library Branch Successful!');
            } else{
                res.status(404);
                res.send('Update Library Branch Failed!');
            }
    } 
    // content negotiation failure
    else {
        res.sendStatus(406);
    }
    
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies', async (req, res) =>{
    await libraryService.getBookCopies(req.params.branchId, req, res);
    if (res.retCode == 1) {
        
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        } else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(res.queryResults);
            res.send(xml);
            return res.status(200);
        } else {
            res.sendStatus(406);
        }
    } else{
        res.sendStatus(404);
    }
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId', async (req, res) => {
    await libraryService.getBookCopy(req.params.branchId, req.params.bookId, req, res);
    if (res.retCode == 1) {
        
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        } else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(res.queryResults);
            res.send(xml);
            res.status(200);
        } else {
            res.sendStatus(406);
        }
    } else{
        res.sendStatus(404);
    }
});

routes.put('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',  function (req, res){
    let body;
    let bookCopyNum;
    if (req.is('application/json') == 'application/json') {
        body = req.body[0];
        bookCopyNum = body.noOfCopies;

    } else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        bookCopyNum = body.noofcopies[0];
    } if (req.is('application/xml') == 'application/xml' || req.is('application/json') == 'application/json') {
        libraryService.updateBookCopyCount(bookCopyNum, req.params.branchId, req.params.bookId, req, res);
        
            // if (res.queryResults == 1) {
            // res.status(201);
            // res.send('Update nunber of Book Copies Successful!');
            // } else{
            //     res.status(404);
            //     console.log(res.finished);
            //     res.send('Update nunber of Book Copies Failed!');
            // }
    // content negotiation failure
     } else {
        res.send(406);
    }
});

module.exports = routes;