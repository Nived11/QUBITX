import express from "express";
import {
  getAddresses,
  getAddressById,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getDefaultAddress,
} from "../controllers/addressController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateUser); 

router.get("/", getAddresses);
router.get("/default", getDefaultAddress); // ✅ Get default
router.get("/:addressId", getAddressById); // ✅ Get single
router.post("/add", addAddress);
router.put("/update/:addressId", updateAddress);
router.delete("/delete/:addressId", deleteAddress);
router.patch("/default/:addressId", setDefaultAddress);

export default router;
