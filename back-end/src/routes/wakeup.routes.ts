import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "Server running..." });
});

export default router;
