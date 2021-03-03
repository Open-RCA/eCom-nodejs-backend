const express = require("express");
const router = express.Router();
const SubController = require("../controllers/subcat.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");

//get all
router.get("/", SubController.getall);

//get by id
router.get("/:id", SubController.getBYid);
    
//get all products in subcategory

//register sub-category
router.post("/new", verifyToken, SubController.addNew);

//update sub-category
router.put("/update/:id", verifyToken, SubController.updateSub);

//delete sub-category
router.delete("/:id", verifyToken, SubController.deleteSub);

module.exports = router;
