const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


const authController=require("../controllers/auth.controller");
const express = require("express");
const router=express.Router()

router.post("/auth/signup",[verifySignUp.checkDuplicateEmail,verifySignUp.checkRolesExisted],authController.signup)
router.post("/auth/signin",authController.signin)

module.exports=router