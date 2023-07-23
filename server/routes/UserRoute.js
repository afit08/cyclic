import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexController from "../controller/IndexController";
import UploadDownloadHelper from "../helpers/UploadDownloadHelper";

const router = Router();

router.post("/signin", authJWT.authenticate,authJWT.login);
router.post("/signup", UploadDownloadHelper.uploadSingleFiles, IndexController.UserController.signup);
//router.post("/refreshtoken",authJWT.refreshToken)

export default router;