var express = require("express");
var router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")
const {getInvoiceById, deleteInvoice, updateInvoice, createInvoice, getallinvoices, getinvoice, getinvoiceuser} = require("../controllers/invoice")

router.param("userId", getUserById); 
router.param("invoiceId", getInvoiceById); 

router.post(
    "/invoice/create/:userId",
    isSignedIn,
    isAuthenticated,
    createInvoice
    );
router.delete("/invoice/:invoiceId/:userId", isSignedIn, isAuthenticated, deleteInvoice);
router.put("/invoice/:invoiceId/:userId", isSignedIn, isAuthenticated, updateInvoice);
router.get("/invoice/getallinvoices/:userId",isSignedIn,isAuthenticated,getallinvoices);
router.get("/invoice/:invoiceId/:userId",isSignedIn,isAuthenticated,getinvoice);
router.get("/invoice/user/:invoiceId/:userId",isSignedIn,isAuthenticated,getinvoiceuser);
module.exports =router;