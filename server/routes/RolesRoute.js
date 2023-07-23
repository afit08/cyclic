import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/", IndexController.RolesController.allRoles);
router.post("/store", IndexController.RolesController.createRoles);

export default router;