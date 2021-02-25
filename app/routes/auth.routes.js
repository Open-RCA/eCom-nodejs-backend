const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


const authController=require("../controllers/auth.controller");
const express = require("express");
const router=express.Router()

router.post("/signup",[verifySignUp.checkDuplicateEmail,verifySignUp.checkRolesExisted],authController.signup)
router.post("/signin",authController.signin)

module.exports=router