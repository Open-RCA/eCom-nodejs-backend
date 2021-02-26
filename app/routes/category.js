const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

const { verifyToken, isAdmin } = require("../middlewares/authJwt");

//get all categories
router.get("/", CategoryController.getall);

//get category by id
router.get("/byid/:id", CategoryController.getByid);

//get top categories
router.get("/top", CategoryController.getTop);

//get sub-categories
router.get("/subcats/:categoryId", CategoryController.getSub);

//search product in categories

//add category
<<<<<<< HEAD
router.post("/new", verifyToken, CategoryController.newCategory);

//update category
router.put("/update/:id", verifyToken, CategoryController.updateCat);

//delete category and all the subcategories
router.delete("/:id", verifyToken, CategoryController.removeCat);
=======
router.post("/new", [verifyToken, isAdmin, CategoryController.newCategory]);

//update category
router.put("/update/:id", [verifyToken, isAdmin, CategoryController.updateCat]);

//delete category and all the subcategories
router.delete("/:id", [verifyToken, isAdmin, CategoryController.removeCat]);
>>>>>>> 64c6cc205e1d905f82ae1b8a39d6fd86f4058df7

module.exports = router;
