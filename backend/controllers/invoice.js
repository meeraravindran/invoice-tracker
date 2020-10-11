const User = require("../models/user")
const Invoice = require("../models/invoice")

//middleware
exports.getInvoiceById = (req, res, next, id) =>{
    Invoice.findById(id)
    .exec((err, invoice) => {
        if(err){
            return res.json({
                error: "Invoice not found"
            });
        }
        req.invoice = invoice;
        next();
    });
}


//create
exports.createInvoice = (req, res) => {
    const invoice = new Invoice(req.body);
    invoice.user=req.profile;
    invoice.save((err, invoice) =>{
        if(err){
            return res.status(400).json({
                error :"Failed to create invoice"
            });
        }
        res.json(invoice);
    });
}
//delete
exports.deleteInvoice = (req, res)=>{
    let invoice = req.invoice;
    invoice.remove((err, deletedinvoice)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete"
            });
        }
        res.json({
            message: "Deleted sucessfully"
        });
    });
}

//update
exports.updateInvoice = (req, res) => {
    Invoice.findByIdAndUpdate(
        {_id: req.invoice._id},
        {$set : req.body},
        {new: true, useFindAndModify: false},
        (err, invoice) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    error: "Not able to update"
                });
            }
            console.log(req.invoice._id);
            console.log(req.body);
            console.log(invoice);
            return res.json(invoice);
        }
    )
}

//getallinvoices
exports.getallinvoices = (req,res)=>{
    console.log(req);
    if(req.profile.role == 1){
    Invoice.find().exec((err,invoices)=>{
        if(err || !invoices){
            return res.status(400).json({
                error:"No invoices found"
            });
        }
        res.json(invoices);
    });
}
else if(req.profile.role == 0){
    Invoice.find({user:req.profile._id}).exec((err,invoices)=>{
        if(err || !invoices){
            return res.status(400).json({
                error:"No invoices found"
            });
        }
        res.json(invoices);
    });
}
}


//getinvoiceforuser
exports.getinvoice = (req,res)=>{
    //console.log(req);
    Invoice.findOne({_id:req.invoice._id}).exec((err,invoices)=>{
        if(err || !invoices){
            return res.status(400).json({
                error:"No invoices found"
            });
        }
        res.json(invoices);
    });
}

exports.getinvoiceuser = (req,res)=>{
    //console.log(req);
    User.findOne({_id:req.invoice.user}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"No user found"
            });
        }
        res.json(user);
    });
}