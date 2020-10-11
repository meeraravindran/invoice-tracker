var express = require("express");
var router = express.Router();
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication")
const {getUserById, getUser, getaUser} = require("../controllers/user")

router.param("userId", getUserById);
//router.param("uId", getaUser);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// router.get("/test", isSignedIn,(req,res)=>{
//     res.send("protected");
// })
module.exports = router;
