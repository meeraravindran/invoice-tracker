const mongoose = require ("mongoose");
var Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

var invoiceSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlenght: 32,
        trim:true
    },
    amount:{
        type: String,
        required: true
    },
    date: {
        type : Date
        //required: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    }
},{timestamps: true}
);

module.exports = mongoose.model("Invoice", invoiceSchema);