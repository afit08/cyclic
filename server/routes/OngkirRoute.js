import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/province", IndexController.OngkirController.province);
// router.post("/store", IndexController.CategoriesController.createCategories);

export default router;