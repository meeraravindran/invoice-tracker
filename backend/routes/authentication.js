var express = require("express");
var router = express.Router();
const {signin, signout, signup, isSignedIn} = require("../controllers/authentication");
const { check, validationResult } = require('express-validator');

router.post("/signup",[
    check("name").isLength({min: 3})
    .withMessage('Name must be at least 3 chars long'),
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min: 3}).withMessage('Password must be min 3 char long')
], signup);

router.post("/signin",[
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({min: 3}).withMessage('Password is required')
], signin);

router.get("/signout", signout);

module.exports = router;