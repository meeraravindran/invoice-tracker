const mongoose = require ("mongoose");
//const { truncate } = require("lodash");
const crypto = require("crypto");
const uudiv1 = require("uuid/v1");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type:  String,
        required: true,
        maxlenght: 32,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
},{timestamps: true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uudiv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })
userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
             return crypto.createHmac('sha256', this.salt)
                   .update(plainpassword)
                   .digest('hex');
            } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);