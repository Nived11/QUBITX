// routes/bannerRoutes.ts
import { Router } from "express";
import { getBanners, addBanner } from "../controllers/bannerController";
import upload from "../middlewares/multerMiddleware"; 

const router: Router = Router();

router.get("/", getBanners);

router.post("/", upload.single("image"), addBanner);

export default router;
